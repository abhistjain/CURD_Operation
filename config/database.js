const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = (req,res) => {
    mongoose.connect(process.env.DATABASE_URL).then(() => {
        console.log("Database Connection successful !");
    }).catch((error) => {
        console.log("Database Connection not successful !");
    });
};

module.exports = dbConnect;