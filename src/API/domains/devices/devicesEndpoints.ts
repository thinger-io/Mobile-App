import { ErrorResponse } from '../../core/errorResponse';
import { Device } from './devicesTypes';
import { ApisauceInstance } from 'apisauce';

const AuthEndpointsFactory = (api: ApisauceInstance) => {
  const fetchUserDevices = ({ userId }: { userId: string }) => {
    return api.get<Device[], ErrorResponse>(`v1/users/${userId}/devices`);
  };

  const fetchDevice = ({ userId, deviceId }: { userId: string; deviceId: string }) => {
    return api.get<Device, ErrorResponse>(`v1/users/${userId}/devices`, { id: deviceId });
  };

  const fetchDeviceStats = ({ userId, deviceId }: { userId: string; deviceId: string }) => {
    return api.get<Device, ErrorResponse>(`v1/users/${userId}/devices/${deviceId}/stats`);
  };

  return { fetchUserDevices, fetchDevice, fetchDeviceStats };
};

export default AuthEndpointsFactory;
