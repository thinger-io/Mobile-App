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

export default class ThingerAPI {
  static getResources(user, device, jwt) {
    return fetch(
      `https://api.thinger.io/v2/users/${user}/devices/${device}/api`,
      generateGETHeader(jwt)
    );
  }

  static getResource(user, device, key, jwt) {
    return fetch(
      `https://api.thinger.io/v2/users/${user}/devices/${device}/${key}/api`,
      generateGETHeader(jwt)
    );
  }

  static post(user, device, key, value, jwt) {
    return fetch(
      `https://api.thinger.io/v2/users/${user}/devices/${device}/${key}`,
      generatePOSTHeader(jwt, { in: value })
    );
  }

  static run(user, device, key, jwt) {
    fetch(
      `https://api.thinger.io/v2/users/${user}/devices/${device}/${key}`,
      generateGETHeader(jwt)
    );
  }
}
