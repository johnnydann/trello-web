import Container from '@mui/material/Container'
import AppBar from '../../components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
// import { mockData } from '~/apis/mock-data'
import { useEffect } from 'react'
import {
    updateBoardDetailsApi,
    updateColumnDetailsApi,
    moveCardToDifferentAPI
} from '~/apis'
import { cloneDeep } from 'lodash'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import {
    fetchBoardDetailsApi,
    updateCurrentActiveBoard,
    selectCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'
import { useDispatch, useSelector } from 'react-redux'

import { useParams } from 'react-router-dom'

function Board() {
    const dispatch = useDispatch()
    // không dùng state của component nữa mà chuyển sang dùng state của redux
    // const [board, setBoard] = useState(null)
    const board = useSelector(selectCurrentActiveBoard)
    const { boardId } = useParams()

    useEffect(() => {
        // call api
        dispatch(fetchBoardDetailsApi(boardId))

    }, [dispatch, boardId])


    //gọi api và xử lý kéo thả column xong xuôi
    // chỉ cần gọi API để cập nhật mảng columnOrderIds của Board chứa nó (thay đổi vị trí trong board )
    const moveColumns = (dndOrderedColumns) => {
        //update cho chuan du lieu state board
        const dndOrderedColsIds = dndOrderedColumns.map((c) => c._id)

        /**
        * Trường hợp dùng Spread Operator này thì lại không sao bởi vì ở đây ta không dùng push như ở trên
        * làm thay đổi trực tiếp kiểu mở rộng mảng, mà chỉ đang gán lại toàn bộ giá trị columns và columnOrderIds
        * bằng 2 mảng mới. Tương tự như cách làm concat ở trường hợp createNewColumn
        */
        const newBoard = { ...board }
        newBoard.columns = dndOrderedColumns
        newBoard.columnOrderIds = dndOrderedColsIds
        // setBoard(newBoard)
        dispatch(updateCurrentActiveBoard(newBoard))

        // API update board
        updateBoardDetailsApi(newBoard._id, { columnOrderIds: dndOrderedColsIds })

    }

    // khi di chuyển card trong cùng column
    // chỉ cần gọi API để cập nhật mảng cardOrderIds của column chứa nó (thay đổi vị trí trong mảng)
    const moveCardInTheSameColumn = (dndOrderedCards, dndOrderedCardIds, columnId) => {
        //update cho chuan du lieu state board
        // const newBoard = { ...board }

        /**
        * Cannot assign to read only property 'cards' of object
        * Trường hợp Immutability ở đây đã đụng tới giá trị cards đang được coi là chỉ đọc read only – (nested object – can thiệp sâu dữ liệu)
        */
        const newBoard = cloneDeep(board)
        const columnToUpdate = newBoard.columns.find(column => column._id === columnId)
        if (columnToUpdate) {
            columnToUpdate.cards = dndOrderedCards
            columnToUpdate.cardOrderIds = dndOrderedCardIds
        }
        // setBoard(newBoard)
        dispatch(updateCurrentActiveBoard(newBoard))

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

        // tương tự đoạn xử lý chỗ moveColumns
        const newBoard = { ...board }
        newBoard.columns = dndOrderedColumns
        newBoard.columnOrderIds = dndOrderedColsIds
        // setBoard(newBoard)
        dispatch(updateCurrentActiveBoard(newBoard))

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

                moveColumns = {moveColumns}
                moveCardInTheSameColumn = {moveCardInTheSameColumn}
                moveCardToDifferentColumn = {moveCardToDifferentColumn}
            />
        </Container>
    )
}

export default Board
