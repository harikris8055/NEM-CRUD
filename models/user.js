const { db } = require("../connection/mongoClient");
var debug = require("debug")("crud:model:user");

module.exports = class User {
  //intitalizing constructor
  constructor(name, age, dob) {
    this.name = name;
    this.age = age;
    this.dob = dob;
    this.DB_NAME = "user";
  }

  //add an user
  async addUser() {
    debug("In addUser");

    //calling db
    const result = await (await db)
      .collection(this.DB_NAME)
      .insertOne({ name: this.name, age: this.age, dob: this.dob });

    debug({ result });

    return result.insertedId;
  }

  //get all users
  static async getUsers() {
    //calling db

    let data = [];
    const cursor = (await db)
      .collection("user")
      .find({})
      .sort([["_id", -1]]);

    await cursor.forEach((doc) => {
      data.push(doc);
    });

    if (!data.length) {
      throw new Error("no_users_found");
    }

    return data;
  }

  //update an user
  async updateUser() {
    debug("In updateUser");

    //calling db
    const result = await (await db)
      .collection(this.DB_NAME)
      .updateOne(
        { name: this.name },
        { $set: { name: this.name, age: this.age, dob: this.dob } }
      );

    if (!result.acknowledged) {
      throw new Error("something went wrong");
    }

    debug({ result });

    return result;
  }

  //delete an user
  async deleteUser() {
    debug("In deleteUser");

    //calling db
    const result = await (await db)
      .collection(this.DB_NAME)
      .deleteOne({ name: this.name });

    if (!result.acknowledged) {
      throw new Error("something went wrong");
    }
    debug({ result });

    return result;
  }
};
