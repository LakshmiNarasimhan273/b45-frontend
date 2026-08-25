const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    // database connection
    await mongoose.connect(process.env.dbport);
    console.log("Database Connected Successfully");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = dbConnection;