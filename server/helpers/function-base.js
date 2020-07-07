const ResponseData = require("../models/shared/response-data");
const responseCode = require("../constants/response-code");

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
  } catch (error) { }
};

exports.manipulate = manipulate;
