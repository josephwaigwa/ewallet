import axios from 'axios';
import BaseUrl from './BaseUrl';

export default axios.create({
  baseURL: `${BaseUrl}api/`,
});