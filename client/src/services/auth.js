const { base } = require("../helpers/ultils");
const { notify } = require("../helpers/toast");
const config = require("../appsetting.json");

module.exports = {
  signIn: async (email, password) => {
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
  },
};
