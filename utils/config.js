// import the dotenv package
require("dotenv").config();

// create all necessery configuration variables
const MongoDB_URL =  process.env.MONGODB_URL;
const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;
// export the configuration variables
module.exports = {
    MongoDB_URL,
    PORT,
    JWT_SECRET
};