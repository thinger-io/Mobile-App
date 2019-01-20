const auth = api => ({
  login: (username, password) => api.post(`/oauth/token?grant_type=password&username=${username}&password=${password}`),
  refreshToken: refreshToken => api.post(`/oauth/token?grant_type=refresh_token&refresh_token=${refreshToken}`),
});

export default auth;
