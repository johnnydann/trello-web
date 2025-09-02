import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

//board
export const fetchBoardDetailsApi = async (boardId) => {
    const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
    //lưu ý axios sẽ trả kết quả về qua property của nó là data
    return response.data
}

export const updateBoardDetailsApi = async (boardId, updateData) => {
    const response = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, updateData)
    return response.data
}

export const moveCardToDifferentAPI = async (updateData) => {
    const response = await axios.put(`${API_ROOT}/v1/boards/supports/moving_card`, updateData)
    return response.data
}


//column
export const createNewColumnApi = async (newColumnData) => {
    const response = await axios.post(`${API_ROOT}/v1/columns`, newColumnData)
    return response.data
}

export const updateColumnDetailsApi = async (columnId, updateData) => {
    const response = await axios.put(`${API_ROOT}/v1/columns/${columnId}`, updateData)
    return response.data
}

export const deleteColumnDetailsApi = async (columnId) => {
    const response = await axios.delete(`${API_ROOT}/v1/columns/${columnId}`)
    return response.data
}

//card
export const createNewCardApi = async (newCardData) => {
    const response = await axios.post(`${API_ROOT}/v1/cards`, newCardData)
    return response.data
}