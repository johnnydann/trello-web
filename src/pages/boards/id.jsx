import Container from '@mui/material/Container'
import AppBar from '../../components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
// import { mockData } from '~/apis/mock-data'
import { useEffect, useState } from 'react'
import { fetchBoardDetailsApi, createNewCardApi, createNewColumnApi } from '~/apis'
import { generatePlaceholderCard } from '~/utils/fortmater'
import { isEmpty } from 'lodash'

function Board() {
    const [board, setBoard] = useState(null)

    useEffect(() => {
        const boardId = '689c9a5c61e0c9cebc04379f'

        fetchBoardDetailsApi(boardId).then((board) => {
            board.columns.forEach(column => {
                if (isEmpty(column.cards)) {
                    column.cards = [generatePlaceholderCard(column)]
                    column.cardOrderIds = [generatePlaceholderCard(column)._id]
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
            columnToUpdate.cards.push(createdCard)
            columnToUpdate.cardOrderIds.push(createdCard._id)
        }
        setBoard(newBoard)
    }


    return (
        <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
            <AppBar />
            <BoardBar board={board} />
            <BoardContent
                board={board}
                createNewColumn ={createNewColumn}
                createNewCard = {createNewCard}
            />
        </Container>
    )
}

export default Board
