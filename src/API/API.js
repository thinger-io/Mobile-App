import fetch from "cross-fetch";

function generateGETHeader(jwt) {
  return {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: "Bearer " + jwt,
      Accept: "application/json, text/plain, */*"
    }
  };
}

function generatePOSTHeader(jwt, body) {
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

export default class API {
  static getResources(server, user, device, jwt) {
    return fetch(
      `${server}/v2/users/${user}/devices/${device}/api`,
      generateGETHeader(jwt)
    );
  }

  static getResource(server, user, device, key, jwt) {
    return fetch(
      `${server}/v2/users/${user}/devices/${device}/${key}/api`,
      generateGETHeader(jwt)
    );
  }

  static post(server, user, device, key, value, jwt) {
    return fetch(
      `${server}/v2/users/${user}/devices/${device}/${key}`,
      generatePOSTHeader(jwt, { in: value })
    );
  }

  static run(server, user, device, key, jwt) {
    return fetch(
      `${server}/v2/users/${user}/devices/${device}/${key}`,
      generateGETHeader(jwt)
    );
  }
}
