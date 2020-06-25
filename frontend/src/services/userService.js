import http from './httpService';
import { apiUrl } from '../config.json';


const apiEndpoint = apiUrl + "/users";

export async function register(user) {
    const data = await http.post(apiEndpoint, { ...user });
    localStorage.setItem('token', data.headers['x-auth-token']);
}

