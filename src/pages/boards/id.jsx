import Container from '@mui/material/Container'
import AppBar from '../../components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { mapOrder } from '~/utils/sorts'
// import { mockData } from '~/apis/mock-data'
import { useEffect, useState } from 'react'
import {
    fetchBoardDetailsApi,
    createNewCardApi,
    createNewColumnApi,
    updateBoardDetailsApi,
    updateColumnDetailsApi,
    moveCardToDifferentAPI,
    deleteColumnDetailsApi
} from '~/apis'
import { generatePlaceholderCard } from '~/utils/fortmater'
import { isEmpty } from 'lodash'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import { toast } from 'react-toastify'

function Board() {
    const [board, setBoard] = useState(null)

    useEffect(() => {
        const boardId = '689c9a5c61e0c9cebc04379f'

        fetchBoardDetailsApi(boardId).then((board) => {
            //sắp xếp các thứ tự các columns luôn ở đây trước khi đưa dữ liệu xuống các component con, vid 71
            board.columns = mapOrder(board.columns, board?.columnOrderIds, '_id')

            board.columns.forEach(column => {
                if (isEmpty(column.cards)) {
                    column.cards = [generatePlaceholderCard(column)]
                    column.cardOrderIds = [generatePlaceholderCard(column)._id]
                } else {
                    //sắp xếp các thứ tự các cards luôn ở đây trước khi đưa dữ liệu xuống các component con
                    column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
                }
            })

            setBoard(board)
        })
    }, [])

    //Func này có chức năng gọi API tạo mới column và làm lại dữ liệu State Board
    const createNewColumn = async (newColumnData) => {
        const createdColumn = await createNewColumnApi({
            ...newColumnData,
            boardId: board._id
        })

        createdColumn.cards = [generatePlaceholderCard(createdColumn)]
        createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]

        //cập nhật state board
        //phía FE phải tự làm đúng lại state date board thay vì phải gọi lại fetchBoardDetailsApi
        const newBoard = { ...board }
        newBoard.columns.push(createdColumn)
        newBoard.columnOrderIds.push(createdColumn._id)
        setBoard(newBoard)
    }

    const createNewCard = async (newCardData) => {
        const createdCard = await createNewCardApi({
            ...newCardData,
            boardId: board._id
        })

        const newBoard = { ...board }
        const columnToUpdate = newBoard.columns.find(column => column._id === createdCard.columnId)
        if (columnToUpdate) {
            // Nếu column rỗng: bản chất là đang chưa một cái PlaceholderCard
            if (columnToUpdate.cards.some(card => card.FE_PlaceholderCard)) {
                columnToUpdate.cards = [createdCard]
                columnToUpdate.cardOrderIds = [createdCard._id]
            } else {
                // ngược lại column đã có data thì push vào cuối mảng
                columnToUpdate.cards.push(createdCard)
                columnToUpdate.cardOrderIds.push(createdCard._id)
            }
        }
        setBoard(newBoard)
    }


    //gọi api và xử lý kéo thả column xong xuôi
    // chỉ cần gọi API để cập nhật mảng columnOrderIds của Board chứa nó (thay đổi vị trí trong board )
    const moveColumns = (dndOrderedColumns) => {
        //update cho chuan du lieu state board
        const dndOrderedColsIds = dndOrderedColumns.map((c) => c._id)

        const newBoard = { ...board }
        newBoard.columns = dndOrderedColumns
        newBoard.columnOrderIds = dndOrderedColsIds
        setBoard(newBoard)

        // API update board
        updateBoardDetailsApi(newBoard._id, { columnOrderIds: dndOrderedColsIds })

    }

    // khi di chuyển card trong cùng column
    // chỉ cần gọi API để cập nhật mảng cardOrderIds của column chứa nó (thay đổi vị trí trong mảng)
    const moveCardInTheSameColumn = (dndOrderedCards, dndOrderedCardIds, columnId) => {
        //update cho chuan du lieu state board
        const newBoard = { ...board }
        const columnToUpdate = newBoard.columns.find(column => column._id === columnId)
        if (columnToUpdate) {
            columnToUpdate.cards = dndOrderedCards
            columnToUpdate.cardOrderIds = dndOrderedCardIds
        }
        setBoard(newBoard)

        //goi API update column
        updateColumnDetailsApi(columnId, { cardOrderIds: dndOrderedCardIds })
    }

    /**
     *
     * khi di chuyển card sang Column khác
     * B1: Cập nhật mảng cardOrderIds của Column ban đầu chứa nó (đơn giản là xoá cái _id của Card ra khỏi mảng)
     * B2: Cập nhật mảng cardOrderIds của Column tiếp theo (đơn giản là thêm _id của Card vào mảng)
     * B3: Cập nhật lại trường columnId mới của cái Card đã kéo
     */
    const moveCardToDifferentColumn = (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns) => {
        //update cho chuan du lieu state board
        const dndOrderedColsIds = dndOrderedColumns.map((c) => c._id)
        const newBoard = { ...board }
        newBoard.columns = dndOrderedColumns
        newBoard.columnOrderIds = dndOrderedColsIds
        setBoard(newBoard)

        //gọi API
        let prevCardOrderIds = dndOrderedColumns.find(c => c._id === prevColumnId)?.cardOrderIds
        // xử lý vấn đề khi kéo card cuối cùng ra khỏi column, column cũ sẽ có placeHolder card, cần xoá nó đi trước khi gửi dữ liệu lên BE
        if (prevCardOrderIds[0].includes('placeholder-card')) prevCardOrderIds = []

        moveCardToDifferentAPI({
            currentCardId,
            prevColumnId,
            prevCardOrderIds,
            nextColumnId,
            nextCardOrderIds: dndOrderedColumns.find(c => c._id === nextColumnId)?.cardOrderIds
        })
    }

    // xử lý xoá một column và cards bên trong nó
    const deleteColumnDetails = (columnId) => {
        //update lại board
        const newBoard = { ...board }
        newBoard.columns = newBoard.columns.filter(c => c._id !== columnId)
        newBoard.columnOrderIds = newBoard.columnOrderIds.filter(_id => _id !== columnId)
        setBoard(newBoard)

        //gọi API xử lý phía BE
        deleteColumnDetailsApi(columnId).then(res => {
            toast.success(res?.deleteResult)
        })

    }

    if (!board) {
        return (
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                width: '100vw',
                height: '100vh'
            }}>
                <CircularProgress />
                <Typography>Loading Board...</Typography>
            </Box>
        )
    }

    return (
        <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
            <AppBar />
            <BoardBar board={board} />
            <BoardContent
                board={board}
                createNewColumn ={createNewColumn}
                createNewCard = {createNewCard}
                moveColumns = {moveColumns}
                moveCardInTheSameColumn = {moveCardInTheSameColumn}
                moveCardToDifferentColumn = {moveCardToDifferentColumn}
                deleteColumnDetails = {deleteColumnDetails}
            />
        </Container>
    )
}

export default Board
