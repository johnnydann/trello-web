import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_ROOT } from '~/utils/constants'
import { generatePlaceholderCard } from '~/utils/fortmater'
import { isEmpty } from 'lodash'
import { mapOrder } from '~/utils/sorts'

// khởi tạo giá trị State của một cái Slice trong redux
const initialState = {
    currentActiveBoard: null
}

// các hành động mà gọi api (bất động bộ) và cập nhật dữ liệu vào Redux, dùng middleware createAsyncThunk đi kèm với extraReducers
export const fetchBoardDetailsApi = createAsyncThunk(
    'activeBoard/fetchBoardDetailsApi',
    async (boardId) => {
        const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
        //lưu ý axios sẽ trả kết quả về qua property của nó là data
        return response.data
    }
)

// khởi tạo một slice trong kho lưu trữ - redux store
export const activeBoardSlice = createSlice({
    name: 'activeBoard',
    initialState,
    // nơi xử lý dữ liệu đồng bộ
    reducers: {
        // lưu ý luôn cần {} cho function trong reducer cho dù code chỉ có một dòng, đây là rule của reducer
        updateCurrentActiveBoard: (state, action) => {
            // action.payload là chuẩn đặt tên dữ liệu và reducer, ở đây chúng ta gán nó ra một biến có nghĩa hơn
            let board = action.payload

            // xử lý dữ liệu
            // ...

            // update lại dữ liệu currentActiveBoard
            state.currentActiveBoard = board
        }

    },

    // ExtraReducers: Nơi xử lý dữ liệu bất đồng bộ
    extraReducers: (builder) => {
        builder.addCase(fetchBoardDetailsApi.fulfilled, (state, action) => {
            // action.payload ở đây chính là cái response.data trả về ở trên
            const board = action.payload

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

            // update lại dữ liệu currentActiveBoard
            state.currentActiveBoard = board
        })
    }
})

// Action creators are generated for each case reducer function
// action: là nơi dành cho các component bên dưới gọi bằng dispatch() tới nó để cập nhật lại dữ liệu thông qua reducer (chạy đồng bộ)
// để ý thì không thấy properties action đâu cả, bởi vì những cái actions này đơn giản là được thằng redux tạo tự động theo tên của reducer

export const { updateCurrentActiveBoard } = activeBoardSlice.actions

// selectors: là nơi dành cho các component bên dưới gọi bằng hook useSelector() để lấy dữ liệu từ trong kho redux store ra sử dụng
export const selectCurrentActiveBoard = (state) => {
    return state.activeBoard.currentActiveBoard
}

// cái file này export phải có reducer
// export default activeBoardSlice.reducer
export const activeBoardReducer = activeBoardSlice.reducer