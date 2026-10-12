const express = require('express');
const app = express();
const mongoose = require('mongoose');
const url = app.get('env') == "production" ? process.env.MONGODB_URI : "mongodb://localhost:27017/MidClan-Api";

console.log("Environment is ", app.get('env'));

mongoose.connect(url, {
        useNewUrlParser: true
    })
    .then(success => console.log("Connection to mongoose successful"))
    .catch(err => console.error("Could not connect to mongoose ", err));

// Mongoose 6 creates indexes without the removed useCreateIndex option.
// Reject user-supplied query operators in filters.
mongoose.set('sanitizeFilter', true);

process.on('exit', () => {
    // mongoose.close();
    mongoose.connection.close();
})


module.exports = mongoose;
