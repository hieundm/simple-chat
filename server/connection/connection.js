const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGO_DB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (error) => {
    // console.log("Kết nối thành công", error);
  }
);

module.exports = mongoose.connection;
