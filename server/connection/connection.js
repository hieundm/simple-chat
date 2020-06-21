const mongoose = require("mongoose");
const setting = require("../appsetting.js");

mongoose.connect(
  setting.connection.mongodb,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (error) => {
    console.log("Kết nối thành công", error);
  }
);

module.exports = mongoose.connection;
