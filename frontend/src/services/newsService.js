import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndPoint = apiUrl + '/news';

export async function getNews() {
    const result = await http.get(apiEndPoint)
    return result;
}



export default {
    getNews
}