import { ErrorResponse } from '../../core/errorResponse';
import { Auth } from './authTypes';
import { ApisauceInstance } from 'apisauce';

const AuthEndpointsFactory = (api: ApisauceInstance) => {
  const signin = ({ username, password }: { username: string; password: string }) => {
    return api.post<Auth, ErrorResponse>(
      'oauth/token',
      `grant_type=password&username=${username}&password=${password}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
  };

  const refreshToken = ({ token }: { token: string }) => {
    return api.post<Auth, ErrorResponse>('oauth/token', `grant_type=refresh_token&refresh_token=${token}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  };

  return { signin, refreshToken };
};

export default AuthEndpointsFactory;
