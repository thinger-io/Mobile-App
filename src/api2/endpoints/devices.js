const devices = api => ({
  get: user => api.get(`v1/users/${user}/devices`),
});

export default devices;
