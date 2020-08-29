const responseData = function (code, message, data) {
  this.code = code;
  this.message = message;
  this.data = data;
};

/**
 * @param {Object} responseCodeObject The response code object
 */
responseData.prototype.bindResponseCode = function(responseCodeObject, data) {
  if (!responseCodeObject) {
    this.code = global.responseCode.failed.value;
    this.message = global.responseCode.failed.description;
  }

  this.code = responseCodeObject.value;
  this.message = responseCodeObject.description;
  this.data = data;
};

module.exports = responseData;
