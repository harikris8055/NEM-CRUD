/**
 * Client for Mongo
 */
const { MongoClient } = require("mongodb");
var debug = require("debug")("crud:db");
require("dotenv").config();

//database variables
const DB_HOST = process.env["DB_HOST"] || "localhost",
  DB_PORT = process.env["DB_PORT"] || "27017",
  DB_NAME = process.env["DB_NAME"] || "sevenchats";

//declaring client
const client = new MongoClient(`mongodb://${DB_HOST}:${DB_PORT}`);

async function init() {
  try {
    console.info(`Firing up mongoose...`);

    const connection = await client.connect(); //connect client

    //check client health
    connection.on("connectionReady", (status) => {
      console.info(`connection::${JSON.stringify(status)}`);
      debug({ status });
    });

    return connection.db(DB_NAME);

  } catch (error) {
    debug("ERROR::MONGO-CLIENT:: " + error.message);
    throw error
  }
}

const db = init()

module.exports.db = db;
