import axios from '../utils/API';

export const Forgot = async (data,header) => await axios.post('forgot/password',data,{headers: header});

export const OtpVerify = async (data,header) => await axios.post('forgot/verify/otp',data,{headers: header});

export const Reset = async (data,header) => await axios.post('forgot/reset',data,{headers: header});