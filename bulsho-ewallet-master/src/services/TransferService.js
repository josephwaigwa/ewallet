import axios from '../utils/API';

export const transferAPI = async (data,header) => await axios.post('transfer',data,{headers: header});