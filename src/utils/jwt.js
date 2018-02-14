import base64 from "base-64";

export function parseJWT(jwt) {
  try {
    const data = jwt.split(".")[1];
    const payload = base64.decode(data);
    const json = JSON.parse(payload);
    return {
      [json.jti]: {
        dev: json.dev,
        iat: json.iat,
        jti: json.jti,
        usr: json.usr,
        jwt,
        isFetching: false,
        isOnline: true,
        isAuthorized: true,
        server: "https://api.thinger.io",
        hasServerConnection: true
      }
    };
  } catch (error) {
    throw error;
  }
}