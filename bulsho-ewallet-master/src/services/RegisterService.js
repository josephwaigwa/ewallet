import axios from '../utils/API';


export const emailExists = async data => await axios.post('email/exists',data);

export const mobileNumberExists = async data => await axios.post('mobile-number/exists',data);

export const sendOTP = async data => await axios.post('register/sendOTP',data);

export const resendOTP = async data => await axios.post('register/resendOTP',data);

export const verifyOTP = async data => await axios.post('register/verifyOTP',data);

export const register = async data => await axios.post('register',data);