import Apisauce from 'apisauce';
import ApiEndpointsFactory from './domains';

const ApiFactory = (baseUrl: string) => {
  const apisauce = Apisauce.create({
    baseURL: baseUrl,
    timeout: 50000,
  });

  apisauce.setHeaders({
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json;charset=UTF-8',
  });

  const api = ApiEndpointsFactory(apisauce);

  const setBaseURL = (url: string) => {
    apisauce.setBaseURL(url);
  };

  const setAuthorization = (token: string): void => {
    apisauce.setHeader('Authorization', `Bearer ${token}`);
  };

  const removeAuthorization = (): void => {
    apisauce.setHeader('Authorization', '');
  };

  return { api, apisauce, setBaseURL, setAuthorization, removeAuthorization };
};

export default ApiFactory;
