const ResponseData = require("../models/shared/responseData");
const responseCode = require("../constants/responseCode");

const manipulate = async (toDo) => {
  try {
    const responseData = new ResponseData(
      responseCode.failed.value,
      responseCode.failed.description
    );

    if (toDo.constructor.name === "AsyncFunction") {
      await toDo(responseData);
    } else {
      toDo(responseData);
    }
  } catch (error) {
  }
};

exports.manipulate = manipulate;
