import axios from '../utils/API';

const DR = 'deposit-request';


export const  DepositRequest = async (data,header) => await axios.post(DR,data,{headers: header});

export const  DepositRequestReply = async (data,header) => await axios.post(`${DR}/reply`,data,{headers: header});

export const  DepositRequestOtpValidate = async (data,header) => await axios.post(`${DR}/otp-validate`,data,{headers: header});

export const  DepositRequestList = async (data,header) => await axios.post(`${DR}/list`,data,{headers: header});
