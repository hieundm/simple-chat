import { base } from "../helpers/Utils";
import { notify } from "../helpers/Toast";
import * as config from "../appsetting.json";

const signIn = async (email, password) => {
	if (!email || email.length < 1 || !password || password.length < 1) {
		notify.error("Please fill full information!");

		return false;
	}

	const response = await base.post("/auth", {
		email,
		password,
	});

	base.onResponse(
		response,
		(data) => {
			notify.success("Signed successfully!");

			base.setCookie(config.cookie.credential, btoa(data.token), 7);

			base.setCookie(
				config.cookie.userInfo,
				btoa(
					escape(
						JSON.stringify({
							name: data.name,
							email: data.email,
						})
					)
				),
				7
			);

			setTimeout(() => {
				window.location.reload();
			}, 1000);
		},
		(response) => console.log(response)
	);

	return true;
};

export { signIn };
