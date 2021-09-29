const Users = require("../models/usersModel");
const platform = require("../platform");

exports.selectAll = async (req, res) => {
  // Select All
  let selectAll = Users.selectAll();
  selectAll.then((result) => {
    res.json(result);
    return;
  });
};