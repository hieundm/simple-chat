const ResponseData = function (code, message, data) {
  this.code = code;
  this.message = message;
  this.data = data;
};

module.exports = ResponseData;
