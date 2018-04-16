//@flow

function generateGETHeader(jwt: string) {
  return {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: "Bearer " + jwt,
      Accept: "application/json, text/plain, */*"
    }
  };
}

function generatePOSTHeader(jwt: string, body) {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: "Bearer " + jwt,
      Accept: "application/json, text/plain, */*"
    },
    body: JSON.stringify(body)
  };
}

type postValue =
  | string
  | number
  | boolean
  | {
      [attribute: string]: string | number | boolean
    };

export default class API {
  static login(server: string, username: string, password: string) {
    return fetch(`${server}/oauth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json, text/plain, */*"
      },
      body: "grant_type=password&username=" + username + "&password=" + password
    });
  }

  static refreshToken(server: string, refreshToken: string) {
    return fetch(`${server}/oauth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json, text/plain, */*"
      },
      body: "grant_type=refresh_token&refresh_token=" + refreshToken
    });
  }

  static getUserDeviceList(server: string, user: string, jwt: string) {
    return fetch(`${server}/v1/users/${user}/devices`, generateGETHeader(jwt));
  }

  static getResources(
    server: string,
    user: string,
    device: string,
    jwt: string
  ) {
    return fetch(
      `${server}/v2/users/${user}/devices/${device}/api`,
      generateGETHeader(jwt)
    );
  }

  static getResource(
    server: string,
    user: string,
    device: string,
    resource: string,
    jwt: string
  ) {
    return fetch(
      `${server}/v2/users/${user}/devices/${device}/${resource}/api`,
      generateGETHeader(jwt)
    );
  }

  static post(
    server: string,
    user: string,
    device: string,
    resource: string,
    value: postValue,
    jwt: string
  ) {
    return fetch(
      `${server}/v2/users/${user}/devices/${device}/${resource}`,
      generatePOSTHeader(jwt, { in: value })
    );
  }

  static run(
    server: string,
    user: string,
    device: string,
    resource: string,
    jwt: string
  ) {
    return fetch(
      `${server}/v2/users/${user}/devices/${device}/${resource}`,
      generateGETHeader(jwt)
    );
  }
}
