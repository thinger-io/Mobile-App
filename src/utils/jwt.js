import base64 from "base-64";

export function parseJWT(jwt: string) {
  try {
    const data: string = jwt.split(".")[1];
    const payload = base64.decode(data);
    const json: {
      dev: string,
      jti: string,
      usr: string,
      iat: number,
      exp: number,
      res: Array<string>
    } = JSON.parse(payload);
    return {
      [json.jti]: {
        dev: json.dev,
        id: json.jti,
        usr: json.usr,
        iat: json.iat,
        exp: json.exp,
        res: json.res,
        jwt,
        isFetching: false,
        isOnline: false,
        isAuthorized: false,
        server: "https://api.thinger.io",
        hasServerConnection: false
      }
    };
  } catch (error) {
    throw error;
  }
}
