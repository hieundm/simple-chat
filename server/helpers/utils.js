module.exports = {
  getPropertyList: (obj) => {
    return Object.keys(obj);
  },
  randomString: (length) => {
    const CHARACTERS =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-";

    let result = "";

    for (let i = 0, j = CHARACTERS.length; i < length; i++) {
      result += CHARACTERS.charAt(Math.floor(Math.random() * j));
    }

    return result;
  },
};
