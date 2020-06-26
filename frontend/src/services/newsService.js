import http from './httpService';

const apiEndPoint = '/news';

export async function getNews() {
    const result = await http.get(apiEndPoint)
    return result;
}



export default {
    getNews
}