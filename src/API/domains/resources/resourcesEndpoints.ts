import { ErrorResponse } from '../../core/errorResponse';
import { InputResource, Resource, OutputResource } from './resourcesTypes';
import { ApisauceInstance } from 'apisauce';

const AuthEndpointsFactory = (api: ApisauceInstance) => {
  const fetchAll = ({ userId, deviceId }: { userId: string; deviceId: string }) => {
    return api.get<{ [resource: string]: Resource }[], ErrorResponse>(`v2/users/${userId}/devices/${deviceId}/api`);
  };

  const fetchOne = ({ userId, deviceId, resource }: { userId: string; deviceId: string; resource: string }) => {
    return api.get<Resource, ErrorResponse>(`v2/users/${userId}/devices/${deviceId}/${resource}/api`);
  };

  const post = ({
    userId,
    deviceId,
    resource,
    value,
  }: {
    userId: string;
    deviceId: string;
    resource: string;
    value: InputResource;
  }) => {
    return api.post<OutputResource, ErrorResponse>(`v2/users/${userId}/devices/${deviceId}/${resource}`, value);
  };

  const run = ({ userId, deviceId, resource }: { userId: string; deviceId: string; resource: string }) => {
    return api.get<void, ErrorResponse>(`v1/users/${userId}/devices/${deviceId}/${resource}`);
  };

  return { fetchAll, fetchOne, post, run };
};

export default AuthEndpointsFactory;
