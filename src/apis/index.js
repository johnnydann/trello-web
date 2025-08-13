import axios from 'axios';
import { API_ROOT } from '~/utils/constants';

export const fetchBoardDetailsApi = async (boardId) => {
    const respone = await axios.get(`${API_ROOT}/v1/boards/${boardId}`);
    //lưu ý axios sẽ trả kết quả về qua property của nó là data
    return respone.data;
}