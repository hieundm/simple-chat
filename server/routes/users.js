const express = require('express');
const router = express.Router();
const connection = require("../connection/connection");

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

const userModel = require("../models/user");

/* GET users listing. */
router.get('/', async function(req, res, next) {

  const data = await getList();

  if(data){
    res.send(data);
  }

  res.send('respond with a resource');
});

//#region Manipulate
const getList = async() => {
  return new Promise(resolve => {
    const data = userModel.find();

    resolve(data);
  });
}
//#endregion

module.exports = router;
