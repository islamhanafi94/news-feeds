import http from './httpService';


const apiEndpoint = "/users";

export async function register(user) {
    const data = await http.post(apiEndpoint, { ...user });
    localStorage.setItem('token', data.headers['x-auth-token']);
}

