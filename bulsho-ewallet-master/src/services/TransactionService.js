import axios from '../utils/API';

export const TransactionList = async (header) => await axios.get('transactions',{headers: header});