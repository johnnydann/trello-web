import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import TextField from '@mui/material/TextField'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react'
import { toast } from 'react-toastify'

import { createNewColumnApi } from '~/apis'
import { generatePlaceholderCard } from '~/utils/fortmater'
import { cloneDeep } from 'lodash'
import { updateCurrentActiveBoard, selectCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
import { useDispatch, useSelector } from 'react-redux'

function ListColumns({ columns }) {
    const dispatch = useDispatch()
    const board = useSelector(selectCurrentActiveBoard)

    const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
    const toggleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)

    const [newColumnTitle, setNewColumnTitle] = useState('')

    const addNewColumn = async () => {
        if (!newColumnTitle) {
            toast.error('please enter a column title')
            return
        }
        //gọi api ở đây
        const newColumnData = {
            title: newColumnTitle
        }

        // gọi API tạo mới column và làm lại dữ liệu State Board
        const createdColumn = await createNewColumnApi({
            ...newColumnData,
            boardId: board._id
        })

        createdColumn.cards = [generatePlaceholderCard(createdColumn)]
        createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]

        //cập nhật state board
        //phía FE phải tự làm đúng lại state data board thay vì phải gọi lại fetchBoardDetailsApi


        /**
        * Đoạn này sẽ dính lỗi object is not extensible bởi dù đã copy/clone ra giá trị newBoard nhưng bản chất
        * của spread operator là Shallow Copy/Clone, nên dính phải rules Immutability trong Redux Toolkit không
        * dùng được hàm PUSH (sửa giá trị mảng trực tiếp), cách đơn giản nhanh gọn nhất ở trường hợp này của chúng
        * ta là dùng tới Deep Copy/Clone toàn bộ cái Board cho dễ hiểu và code ngắn gọn.
        * https://redux-toolkit.js.org/usage/immer-reducers
        * Tài liệu thêm về Shallow và Deep Copy Object trong JS:
        * https://www.javascripttutorial.net/object/3-ways-to-copy-objects-in-javascript/
        */
        // const newBoard = { ...board }
        const newBoard = cloneDeep(board)
        newBoard.columns.push(createdColumn)
        newBoard.columnOrderIds.push(createdColumn._id)
        // setBoard(newBoard)

        /**
        * Ngoài ra cách nữa là vẫn có thể dùng array.concat thay cho push như docs của Redux Toolkit ở trên vì
        * push sẽ thay đổi giá trị mảng trực tiếp, còn concat thì nó merge - ghép mảng lại và
        * tạo ra một mảng mới để chúng ta gán lại giá trị nên không vấn đề gì.
        */
        // const newBoard = { ...board }
        // newBoard.columns = newBoard.columns.concat([createdColumn])
        // newBoard.columnOrderIds = newBoard.columnOrderIds.concat([createdColumn._id])

        dispatch(updateCurrentActiveBoard(newBoard))
        //đóng trạng thái thêm columns mới và clear input
        toggleOpenNewColumnForm()
        setNewColumnTitle('')
    }

    return (
        <SortableContext
            items={columns?.map((c) => c._id)}
            strategy={horizontalListSortingStrategy}
        >
            <Box
                sx={{
                    bgcolor: 'inherit',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    overflowX: 'auto',
                    overflowY: 'hidden',
                    '&::-webkit-scrollbar-track': { m: 2 }
                }}
            >
                {/* board content */}
                {columns?.map((column) =>
                    <Column key={column._id} column={column} />
                )}

                {/* box add new column */}
                {!openNewColumnForm
                    ? <Box onClick = {toggleOpenNewColumnForm}
                        sx={{
                            minWidth: '250px',
                            maxWidth: '250px',
                            mx: 2,
                            borderRadius: '6px',
                            height: 'fit-content',
                            bgcolor: '#ffffff3d'
                        }}
                    >
                        <Button
                            startIcon={<NoteAddIcon />}
                            sx={{
                                color: 'white',
                                width: '100%',
                                justifyContent: 'flex-start',
                                pl: 2.5,
                                py: 1
                            }}
                        >
                            Add new column
                        </Button>
                    </Box>
                    : <Box sx={{
                        minWidth: '250px',
                        maxWidth: '250px',
                        mx: 2,
                        p: 1,
                        borderRadius: '6px',
                        height: 'fit-content',
                        bgcolor: '#ffffff3d',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1
                    }}>
                        <TextField
                            size='small'
                            label='Enter column title'
                            type='text'
                            variant='outlined'
                            autoFocus
                            value={newColumnTitle}
                            onChange={(e) => setNewColumnTitle(e.target.value)}
                            sx={{
                                '& label': { color: 'white' },
                                '& input': { color: 'white' },
                                '& label.Mui-focused': { color: 'white' },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: 'white' },
                                    '&:hover fieldset': { borderColor: 'white' },
                                    '&.Mui-focused fieldset': { borderColor: 'white' }
                                }
                            }}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Button
                                onClick={addNewColumn}
                                variant='contained'
                                color='success'
                                size='small'
                                sx={{
                                    boxShadow: 'none',
                                    border: '0.5px solid',
                                    borderColor: (theme) => theme.palette.success.main,
                                    '&:hover': { bgcolor: (theme) => theme.palette.success.main }
                                }}
                            >Add column</Button>
                            <CloseIcon
                                fontSize='small'
                                sx={{
                                    color: 'white',
                                    cursor: 'pointer',
                                    '&:hover': { color: (theme) => theme.palette.warning.light }
                                }}
                                onClick={toggleOpenNewColumnForm}
                            />
                        </Box>
                    </Box>
                }

            </Box>
        </SortableContext>
    )
}

export default ListColumns
