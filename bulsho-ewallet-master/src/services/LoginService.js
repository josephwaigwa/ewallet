import axios from '../utils/API';


export const loginApi = async data => await axios.post('login',data);

export const registerApi = async data => await axios.post('register',data);

export const userInfo = async header => await axios.get('dashboard',{headers: header});