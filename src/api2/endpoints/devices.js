const devices = api => ({
  getDevices: username => api.get(`v1/users/${username}/devices`),
});

export default devices;
