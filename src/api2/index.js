import apisauce from 'apisauce';
import Config from '../config';
import endpoints from './endpoints';

let api2 = null;
let apiWithEndPoints = null;

const create = () => {
  api2 = apisauce.create({
    baseURL: Config.api.url,
  });
  api2.setHeaders({
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json;charset=UTF-8',
  });

  apiWithEndPoints = endpoints.create(api2);
  return apiWithEndPoints;
};

const setBaseURL = url => api2.setBaseURL(url);
const setAuthorization = jwt => api2.setHeader('Authorization', `Bearer ${jwt}`);
const removeAuthorization = () => api2.setHeader('Authorization', null);

const getApi = () => api2;
const getApiWithEndpoints = () => apiWithEndPoints;

export default {
  create,
  getApi,
  getApiWithEndpoints,
  setBaseURL,
  setAuthorization,
  removeAuthorization,
};
