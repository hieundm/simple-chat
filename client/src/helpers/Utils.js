import axios from "axios";
import { apiHost, cookie } from "../appsetting.json";
import { notify } from "./Toast";
import * as rdd from "react-device-detect";
import StringBuffer from "./StringBuffer";

const base = {
	get: path => {
		return new Promise(resolve => {
			if (!path || path.length < 1) {
				throw "path can not be null";
			}
			// console.log("------------------");
			// console.log("os:", rdd.osName);
			// console.log("brand:", rdd.mobileVendor);
			// console.log("model:", rdd.mobileModel);
			// console.log("os version:", rdd.osVersion);
			// console.log("browser name:", rdd.browserName);
			// console.log("browserVersion:", rdd.browserVersion);
			// console.log("is-mobile", rdd.isMobile);

			const object = {
				brand: rdd.mobileVendor,
				browserName: rdd.browserName,
				browserVersion: rdd.browserVersion,
				isMobile: rdd.isMobile,
				model: rdd.mobileModel,
				os: rdd.osName,
				osVersion: rdd.osVersion,
			};

			axios
				.get(`${apiHost}${path}`, {
					headers: {
						"Authorization": atob(base.getCookie(cookie.credential)),
						"SC-Device-Token": btoa(JSON.stringify(object))
					},
				})
				.then(response => {
					resolve(response.data);
				})
				.catch(error => console.log(error));
		});
	},
	getCookie: cookieName => {
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
		return new Promise(resolve => {
			if (!path || path.length < 1) {
				throw "path can not be null";
			}
			if (!data) {
				throw "data can not be null";
			}

			axios
				.post(`${apiHost}${path}`, data, {
					headers: {
						Authorization: atob(base.getCookie(cookie.credential)),
					},
				})
				.then(response => {
					resolve(response.data);
				})
				.catch(error => console.log(error));
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
