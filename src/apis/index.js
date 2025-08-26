import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

//board
export const fetchBoardDetailsApi = async (boardId) => {
    const respone = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
    //lưu ý axios sẽ trả kết quả về qua property của nó là data
    return respone.data
}

export const updateBoardDetailsApi = async (boardId, updateData) => {
    const respone = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, updateData)
    //lưu ý axios sẽ trả kết quả về qua property của nó là data
    return respone.data
}

//column
export const createNewColumnApi = async (newColumnData) => {
    const respone = await axios.post(`${API_ROOT}/v1/columns`, newColumnData)
    return respone.data
}

//card
export const createNewCardApi = async (newCardData) => {
    const respone = await axios.post(`${API_ROOT}/v1/cards`, newCardData)
    return respone.data
}