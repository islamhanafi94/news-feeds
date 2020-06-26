import http from './httpService';

const apiEndPoint = '/sources';

export async function getAvailableSources() {
    const { data } = await http.get(apiEndPoint + '/all');
    if (!data) return null;
    return data;
}

export async function getUserSources() {
    const { data } = await http.get(apiEndPoint);
    return data;
}
export async function addSource(sourceID) {
    await http.put(apiEndPoint, { sourceID });
}
export async function removeSource(sourceID) {
    await http.delete(apiEndPoint, { data: { sourceID } });
}


export default {
    getAvailableSources,
    getUserSources,
    addSource,
    removeSource
}

