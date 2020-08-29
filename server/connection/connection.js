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

mongoose.connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

module.exports = mongoose.connection;
