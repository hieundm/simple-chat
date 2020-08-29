const responseData = require("../models/shared/response-data");

const manipulate = async (toDo) => {
  try {
    const response = new responseData(
      global.responseCode.failed.value,
      global.responseCode.failed.description
    );

    if (toDo.constructor.name === "AsyncFunction") {
      await toDo(response);
    } else {
      toDo(response);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.manipulate = manipulate;
