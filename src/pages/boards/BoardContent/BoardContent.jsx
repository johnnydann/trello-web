import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import {
    DndContext,
    // PointerSensor,
    // MouseSensor,
    // TouchSensor,
    useSensor,
    useSensors,
    DragOverlay,
    defaultDropAnimationSideEffects,
    closestCorners,
    // closestCenter,
    pointerWithin,
    // rectIntersection,
    getFirstCollision
} from '@dnd-kit/core'
import { MouseSensor, TouchSensor } from '~/customLib/DndkitSensors'
import { useCallback, useEffect, useRef, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'

import { cloneDeep, isEmpty } from 'lodash'

import { generatePlaceholderCard } from '~/utils/fortmater'

const ACTIVE_DRAG_ITEM_TYPE = {
    COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
    CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'

function BoardContent({
    board,
    moveColumns,
    moveCardInTheSameColumn,
    moveCardToDifferentColumn
}) {
    const [orderedColumns, setOrderedColumns] = useState([])

    //cùng một thời điểm chỉ có một phần tử đang đc kéo (column hoặc card)
    const [activeDragItemId, setactiveDragItemId] = useState(null)
    const [activeDragItemType, setactiveDragItemType] = useState(null)
    const [activeDragItemData, setactiveDragItemData] = useState(null)
    const [oldColWhenDraggingCard, setOldColWhenDraggingCard] = useState(null)

    //điểm va chạm cuối cùng (xử lý thuật toán va chạm, 37)
    const lastOverId = useRef(null)

    useEffect(() => {
        // Columns đã được sắp xếp ở component cha cao nhất (board/id.jsx) vid 71 lí do
        setOrderedColumns(board.columns)
    }, [board])

    // const pointerSensor = useSensor(PointerSensor, {
    //     activationConstraint: { distance: 10 },
    // });

    //di chuyển chuột 10px thì mới kích hoạt event
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: { distance: 10 }
    })

    //nhấn giữ 250ms và dung sai của ứng dụng (di chuyển 500px) thì mới kích hoạt event
    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: { delay: 250, tolerance: 500 }
    })

    // const mySensors = useSensors(pointerSensor);
    const mySensors = useSensors(mouseSensor, touchSensor)

    //tìm một cái column theo cái cardId
    const findColumnByCardId = (cardId) => {
        return orderedColumns.find(
            (column) => column?.cards?.map((card) => card._id)?.includes(cardId) // có thể dùng some thay thế map
        )
    }

    // Func cập nhật lại state trong trường hợp di chuyển card giữa các column khác nhau
    const moveCardBetweenDifferentColumns = (
        overColumn,
        overCardId,
        over,
        active,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData,
        triggerFrom
    ) => {
        setOrderedColumns((prevColumns) => {
            const overCardIndex = overColumn?.cards?.findIndex(
                (card) => card._id === overCardId
            )

            let newCardIndex

            const isBelowOverItem =
                over &&
                active.rect.current.translated &&
                active.rect.current.translated.top > over.rect.top + over.rect.height

            const modifier = isBelowOverItem ? 1 : 0
            newCardIndex =
                overCardIndex >= 0
                    ? overCardIndex + modifier
                    : overColumn?.cards?.length + 1

            //clone mảng orderedColumnsState cũ ra một cái mới để xử lý data rồi
            //return - cập nhật lại orderedColumnsState mới
            const nextColumns = cloneDeep(prevColumns)
            const nextActiveColumn = nextColumns.find(
                (column) => column._id === activeColumn._id
            )
            const nextOverColumn = nextColumns.find(
                (column) => column._id === overColumn._id
            )

            //column cũ
            if (nextActiveColumn) {
                //xoá card ở cái column active (column cũ)
                nextActiveColumn.cards = nextActiveColumn.cards.filter(
                    (card) => card._id !== activeDraggingCardId
                )

                if (isEmpty(nextActiveColumn.cards)) {
                    nextActiveColumn.cards = [
                        generatePlaceholderCard(nextActiveColumn)
                    ]
                }
                //cập nhật lại cardOrderIds cho chuẩn dữ liệu
                nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
                    (card) => card._id
                )
            }

            //column mới
            if (nextOverColumn) {
                //kiểm tra xem card đang kéo nó có tồn tại ở overColumn chưa, nếu có thì xoá nó trước
                nextOverColumn.cards = nextOverColumn.cards.filter(
                    (card) => card._id !== activeDraggingCardId
                )

                //phải cập nhật lại dữ liệu columnId trong card sau khi kéo giữa hai column khác nhau
                const rebuild_activeDraggingCardData = {
                    ...activeDraggingCardData,
                    columnId: nextOverColumn._id
                }

                //thêm index mới cho cái card vừa kéo vào
                nextOverColumn.cards = nextOverColumn.cards.toSpliced(
                    newCardIndex,
                    0,
                    rebuild_activeDraggingCardData
                )

                //xoá placeholder card
                nextOverColumn.cards = nextOverColumn.cards.filter(
                    (card) => !card.FE_PlaceholderCard
                )
                nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
                    (card) => card._id
                )
            }

            // Nếu func này được gọi từ handleDragEnd nghĩa là kéo thả xong, lúc này mới xử lý gọi API 1 lần ở đây
            if (triggerFrom === 'handleDragEnd') {
                // gọi lên props func lên moveCardToDifferentColumn nằm ở component cha cao nhất (boards/id.jsx)
                // phải dùng tới activeDraggingCardId.columnId hoặc tốt nhất là oldColWhenDraggingCard._id (set vào state từ bước handleDragStart) chứ không phải activeData trong scope handleDragEnd này là vì sau khi đi qua  onDragOver và tới đây là state của card đã bị cập nhật 1 lần rồi
                moveCardToDifferentColumn(
                    activeDraggingCardId,
                    oldColWhenDraggingCard._id,
                    nextOverColumn._id,
                    nextColumns
                )
            }

            return nextColumns
        })
    }

    //trigger khi bắt đầu kéo một phần tử
    const handleDragStart = (event) => {
        // console.log("handleDragStart:", event);
        setactiveDragItemId(event?.active?.id)
        setactiveDragItemType(
            event?.active?.data?.current?.columnId
                ? ACTIVE_DRAG_ITEM_TYPE.CARD
                : ACTIVE_DRAG_ITEM_TYPE.COLUMN
        )
        setactiveDragItemData(event?.active?.data?.current)

        //nếu là kéo card thì mới thực hiện hành động set giá trị oldColumn
        if (event?.active?.data?.current?.columnId) {
            setOldColWhenDraggingCard(findColumnByCardId(event?.active?.id))
        }
    }

    const handleDragOver = (event) => {
        // console.log("handleDragOver");
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

        const { active, over } = event

        //ko tồn tại active hoặc over
        if (!active || !over) return

        //activeDraggingCard là cái đang đc kéo (khi kéo ra khỏi container) thì ko làm gì tránh crash trang
        const {
            id: activeDraggingCardId,
            data: { current: activeDraggingCardData }
        } = active

        // console.log("activeDraggingCardId", activeDraggingCardId);
        //overCard: là cái card đang nằm tương tác trên hoặc dưới so với cái card đc kéo ở trên
        const { id: overCardId } = over

        //tìm 2 cái columns theo cardId
        const activeColumn = findColumnByCardId(activeDraggingCardId)
        const overColumn = findColumnByCardId(overCardId)

        if (!activeColumn || !overColumn) return

        if (activeColumn._id !== overColumn._id) {
            moveCardBetweenDifferentColumns(
                overColumn,
                overCardId,
                over,
                active,
                activeColumn,
                activeDraggingCardId,
                activeDraggingCardData,
                'handleDragOver'
            )
        }
    }

    //trigger khi kết thúc hành động kéo một phần tử
    const handleDragEnd = (event) => {
        // console.log("handleDragEnd:", event);

        const { active, over } = event

        //kiểm tra lỗi nếu ko tồn tại
        if (!active || !over) return

        //xử lý kéo thả card
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
            //activeDraggingCard là cái đang đc kéo (khi kéo ra khỏi container) thì ko làm gì tránh crash trang
            const {
                id: activeDraggingCardId,
                data: { current: activeDraggingCardData }
            } = active

            //overCard: là cái card đang nằm tương tác trên hoặc dưới so với cái card đc kéo ở trên
            const { id: overCardId } = over

            //tìm 2 cái columns theo cardId
            const activeColumn = findColumnByCardId(activeDraggingCardId)
            const overColumn = findColumnByCardId(overCardId)

            //kiểm tra nếu ko có 1 trong 2 column thì ko làm gì hết, tránh crash web
            if (!activeColumn || !overColumn) return

            // console.log("oldColumn", oldColWhenDraggingCard);
            // console.log("overColumn", overColumn);

            // hành động kéo thả card giữa 2 columns khác nhau
            // phải dùng tới activeDragItemData.columnId hoặc oldColWhenDraggingCard._id (set vào state từ bước handleDragStart) chứ không phải activeData trong scope handleDragEnd này vì sau khi di qua onDragOver tới đây là state của card đã bị cập nhật một lần rồi
            if (oldColWhenDraggingCard._id !== overColumn._id) {
                moveCardBetweenDifferentColumns(
                    overColumn,
                    overCardId,
                    over,
                    active,
                    activeColumn,
                    activeDraggingCardId,
                    activeDraggingCardData,
                    'handleDragEnd'
                )
            } else {
                //hành động kéo thả card trong cùng 1 column
                //lấy vị trí cũ từ oldColWhenDraggingCard
                const oldCardIndex = oldColWhenDraggingCard?.cards?.findIndex((c) => c._id === activeDragItemId )
                //lấy vị trí mới từ thằng overColumn
                const newCardIndex = overColumn?.cards.findIndex( (c) => c._id === overCardId )

                //kéo card logic tương tự với column
                const dndOrderedCards = arrayMove( oldColWhenDraggingCard?.cards, oldCardIndex, newCardIndex)

                const dndOrderedCardIds = dndOrderedCards.map( (card) => card._id )


                setOrderedColumns((prevColumns) => {
                    const nextCards = cloneDeep(prevColumns)

                    const targetColumn = nextCards.find( (column) => column._id === overColumn._id )

                    targetColumn.cards = dndOrderedCards
                    targetColumn.cardOrderIds = dndOrderedCardIds
                    // console.log("targetColumn: ", targetColumn);
                    return nextCards
                })

                //gọi lên props func lên moveCardInTheSameColumn nằm ở component cha cao nhất (boards/id.jsx)
                moveCardInTheSameColumn(dndOrderedCards, dndOrderedCardIds, oldColWhenDraggingCard._id)
            }
        }

        //xử lý kéo thả column
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
            if (active.id !== over.id) {
                //lấy vị trí cũ từ active
                const oldColumnIndex = orderedColumns.findIndex(
                    (c) => c._id === active.id
                )
                //lấy vị trí mới từ over
                const newColumnIndex = orderedColumns.findIndex(
                    (c) => c._id === over.id
                )

                //packages/sortable/src/utilities/arrayMove.ts src code cảu arrayMove
                const dndOrderedColumns = arrayMove(
                    orderedColumns,
                    oldColumnIndex,
                    newColumnIndex
                )

                //cập nhật lại sau khi kéo thả
                //vẫn gọi update state ở đây để tránh delay hoặc bị nhảy giao diện lúc kéo thả cần phải chờ gọi API
                setOrderedColumns(dndOrderedColumns)

                //gọi lên props func lên moveColumns nằm ở component cha cao nhất (boards/id.jsx)
                moveColumns(dndOrderedColumns)
            }
        }

        setactiveDragItemId(null)
        setactiveDragItemType(null)
        setactiveDragItemData(null)
        setOldColWhenDraggingCard(null)
    }

    const customDropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({
            styles: {
                active: { opacity: '0.5' }
            }
        })
    }

    const collisionDetectionStrategy = useCallback(
        (args) => {
            // console.log("collisionDetectionStrategy");
            if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
                return closestCorners({ ...args })
            }

            //tìm các điểm giao nhau, va chạm intersection với con trỏ
            const pointerIntersections = pointerWithin(args)

            //nếu pointerIntersections là mảng rỗng return luôn ko làm gì hết
            //fix triệt để lỗi fickering của thư viện dndkit (chỉ bị với card có cover ảnh)
            if (!pointerIntersections) return

            // const intersections =
            //     pointerIntersections?.length > 0 //để ? để tránh null và bị crash trang
            //         ? pointerIntersections
            //         : rectIntersection(args);

            //tìm overId đầu tiên trong intersections ở trên
            let overId = getFirstCollision(pointerIntersections, 'id')
            if (overId) {
                //nếu cái over nó là column thì sẽ tự tìm tới cái cardId gần nhất bên trong khu vực va chạm đó dựa vào thuật toán
                //phát hiện va chạm closestCenter hoặc closestCorners đều đc
                const checkColumn = orderedColumns.find(
                    (column) => column._id === overId
                )
                if (checkColumn) {
                    overId = closestCorners({
                        ...args,
                        droppableContainers: args.droppableContainers.filter(
                            (container) =>
                                container.id !== overId &&
                                checkColumn?.cardOrderIds?.includes(container.id)
                        )
                    })[0]?.id
                }
                lastOverId.current = overId
                return [{ id: overId }]
            }

            //nếu overId là null thì trả về mảng rỗng, tránh lỗi crash trang
            return lastOverId.current ? [{ id: lastOverId.current }] : []
        },
        [activeDragItemType, orderedColumns]
    )

    return (
        <DndContext
            sensors={mySensors}
            //dùng closestCorners sẽ bị lỗi nhảy (flickering)
            // collisionDetection={closestCorners} //thuật toán phát hiện va chạm
            collisionDetection={collisionDetectionStrategy}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <Box
                sx={{
                    bgcolor: (theme) =>
                        theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
                    width: '100%',
                    height: (theme) => theme.trello.boardContenHeight,
                    p: '10px 0'
                }}
            >
                <ListColumns columns={orderedColumns} />
                <DragOverlay dropAnimation={customDropAnimation}>
                    {!activeDragItemType && null}
                    {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
                        <Column column={activeDragItemData}></Column>
                    )}
                    {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
                        <Card card={activeDragItemData}></Card>
                    )}
                </DragOverlay>
            </Box>
        </DndContext>
    )
}

export default BoardContent
