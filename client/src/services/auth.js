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
      notify.success("Signed successfull!");

      base.setCookie(config.cookie.credential, btoa(data.token), 7);

      base.setCookie(
        config.cookie.userInfo,
        btoa(
          escape(
            JSON.stringify({
              name: data.name,
            })
          )
        ),
        7
      );

      window.location.reload();
    },
    (response) => console.log(response)
  );

  return true;
};

export { signIn };
