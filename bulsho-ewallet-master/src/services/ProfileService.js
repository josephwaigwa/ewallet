import axios from '../utils/API';

export const update = async (data,header) => await axios.post('profile',data,{headers: header});

export const emailExists = async (data,header) => await axios.post('profile/email',data,{headers: header});

export const vendorList = async header => await axios.get('vendor/list',{headers: header});

export const FCM = async (data,header) => await axios.post('fcm/token',data,{headers: header});