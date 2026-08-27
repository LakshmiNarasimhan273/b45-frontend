const mongoose = require("mongoose");

const dbConnection = async () => {
    try{
        await mongoose.connect(process.env.dbport);
        console.log("Database connected successfully");
    }catch(err){
        console.log(err);
        process.exit(1);
    }
};

module.exports = dbConnection;