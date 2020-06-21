const axios = require("axios");
const { apiHost } = require("../appsetting.json");
const { notify } = require("../helpers/toast");

const base = {
  get: (path) => {
    return new Promise((resolve) => {
      if (!path || path.length < 1) {
        throw "path can not be null";
      }

      axios
        .get(`${apiHost}${path}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => console.log(error));
    });
  },
  getCookie: (cookieName) => {
    const str = `${cookieName}=`;

    const ca = document.cookie.split(";");

    for (let i = 0, j = ca.length, str1 = ""; i < j; i += 1) {
      str1 = ca[i];

      while (str1.charAt(0) === " ") {
        str1 = str1.substring(1);
      }

      if (str1.indexOf(str) != -1) {
        return str1.substring(str.length, str1.length);
      }
    }

    return "";
  },
  post: async (path, data) => {
    return new Promise((resolve) => {
      if (!path || path.length < 1) {
        throw "path can not be null";
      }
      if (!data) {
        throw "data can not be null";
      }

      axios
        .post(`${apiHost}${path}`, data)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => console.log(error));
    });
  },
  setCookie: (cookieName, cookieValue, expireDays) => {
    const d = new Date();

    d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);

    document.cookie = `${cookieName}=${cookieValue}; expires=${d.toUTCString()}; path=/`;
  },
  onResponse: async (response, onSuccess, onFail) => {
    if (response.code === 0) {
      if (onSuccess) {
        if (onSuccess.isAsyncFunction() === true) {
          await onSuccess(response.data);
        } else {
          onSuccess(response.data);
        }
      }
    } else {
      notify.error(response.message);

      if (onFail) {
        if (onFail.isAsyncFunction() === true) {
          await onFail(response);
        } else {
          onFail(response);
        }
      }
    }
  },
};

export { base };
