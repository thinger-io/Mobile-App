const auth = api => ({
  login: ({ username, password }) => api.post('/oauth/token', { grant_type: 'password', username, password }),
  refreshToken: refreshToken => api.post('/oauth/token', { grant_type: 'refresh_token', refresh_token: refreshToken }),
});

export default auth;
