const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/students-api", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connection is successfull with db");
}).catch((e) => {
    console.log("no connection between db");
})