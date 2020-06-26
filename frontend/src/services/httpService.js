import axios from 'axios';
import { apiUrl } from "../config.json";

axios.defaults.baseURL = process.env.REACT_APP_API_URL || apiUrl


export function setJwt(token) {
    axios.defaults.headers.common['x-auth-token'] = token
}


export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    setJwt
};