import { base } from "../helpers/Utils";
import { notify } from "../helpers/Toast";
import Regex from "../helpers/Regex";

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
      notify.success("Change password successfully!");
    },
    (response) => console.log(response)
  );

  return true;
};

const register = async (data) => {
  const { email, first_name, last_name, password } = data;

  if (!email || email.length < 1) {
    notify.error("Please enter your email!");

    return false;
  } else if (Regex.email.test(email) === false) {
    notify.error("Email not correct format!");

    return false;
  } else if (!first_name || first_name.length < 1) {
    notify.error("Please enter your first name!");

    return false;
  } else if (!last_name || last_name.length < 1) {
    notify.error("Please enter your last name!");

    return false;
  } else if (!password || password.length < 1) {
    notify.error("Please enter your password!");

    return false;
  }

  const response = await base.post("/account/register", data);

  base.onResponse(
    response,
    (data) => {
      notify.success("Sign up successfully!");
    },
    (response) => console.log(response)
  );

  return true;
};

export { forgotPassword, register };
