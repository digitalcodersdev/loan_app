import {SERVER_URL} from '@env';
const getApiUri = (uri = '') => `${SERVER_URL}/api/v1${uri}`;
export default getApiUri;
