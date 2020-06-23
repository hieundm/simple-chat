import { base } from "../helpers/ultils";
import { notify } from "../helpers/toast";
import * as config from "../appsetting.json";

const signIn = async (email, password) => {
  if (!email || email.length < 1 || !password || password.length < 1) {
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
    },
    (response) => console.log(response)
  );

  return true;
};

const forgotPassword = async (email, newPassword) => {
  if (!email || email.length < 1 || !newPassword || newPassword.length < 1) {
    return false;
  }

  const response = await base.post("/account/forgot-password", {
    email,
    newPassword,
  });

  base.onResponse(
    response,
    (data) => {
      notify.success("Change password successfull!");
    },
    (response) => console.log(response)
  );

  return true;
}


export {
  forgotPassword
  ,
  signIn
};
