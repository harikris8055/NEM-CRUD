var express = require("express");
var router = express.Router();
const {
  addUserCont,
  getUserCont,
  updateUserCont,
  deleteUserCont,
} = require("../controllers/user");

/* user routers. */
router
  .post("/add", addUserCont)
  .get("/", getUserCont)
  .put("/update", updateUserCont)
  .delete("/delete", deleteUserCont);

module.exports = router;
