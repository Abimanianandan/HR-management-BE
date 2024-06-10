// import the mongoose module
const mongoose = require("mongoose");

// import the config module
const config = require("./utils/config");

// import the app module
const app = require("./app");


console.log("connecting to mongodb...");

// connect to mongodb using mongoose
mongoose.connect(config.MongoDB_URL)
.then(()=>{
    console.log("connected to mongodb..👍");
    // start the server
    app.listen(config.PORT,()=>{
        console.log(`server 🌍 running on port ${config.PORT}`);
    })
})
.catch((error)=>{
    console.log("Error connecting to mongodb...",error.message);
})