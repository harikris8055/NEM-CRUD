const User = require("../models/user");
const debug = require("debug")("crud:controller/user");
module.exports = {
  /**
   * @description adds an user to the database
   * @param {*} req
   * @param {*} res
   */
  addUserCont: async function (req, res) {
    try {
      const { name, age, dob } = req.body;

      //init instance of class
      const user = new User(name, age, dob);
      const userId = await user.addUser();
      debug("in addusercont");
      debug({userId});
      res.json({ data: userId });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * @description retrives all the users
   * @param {*} _req
   * @param {*} res
   */
  getUserCont: async function (_req, res) {
    try {
      //call static method
      const users = await User.getUsers();
      debug("in getUserCont");
      debug({ users });
      return res.json({ data: users });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ error: error.message });
    }
  },

  /**
   * @description update an exisiting user
   * @param {*} req
   * @param {*} res
   */
  updateUserCont: async function (req, res) {
    try {
      const { name, age, dob } = req.body;

      //init instance of class
      const user = new User(name, age, dob);
      const result = await user.updateUser();
      debug("in addusercont");
      res.json({ data: result });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * @description delete an user with {name}
   * @param {*} req
   * @param {*} res
   */
  deleteUserCont: async function (req, res) {
    try {
      const name = req.body.name;
      //init instance of class
      const users = new User(name);
      const result = await users.deleteUser();
      debug("in deleteUserCont");
      res.json({ data: result });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  },
};
