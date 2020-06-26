import jwtDecode from 'jwt-decode';
import http from './httpService';

const apiEndPoint = '/auth';

http.setJwt(getJwt());

export async function login(email, password) {
    const data = await http.post(apiEndPoint, { email, password });
    localStorage.setItem('token', data.headers['x-auth-token']);
}

export function loginWithJwt(token) {
    localStorage.setItem(token)
}

export function logout() {
    localStorage.removeItem('token')
}

export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem('token');
        const user = jwtDecode(jwt);
        return user
    } catch (error) {
        return null
    }
}

export function getJwt() {
    return localStorage.getItem('token');
}

export default {
    login,
    logout,
    loginWithJwt,
    getCurrentUser,
    getJwt
}