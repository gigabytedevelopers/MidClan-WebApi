const express = require('express');
const app = express();
const mongoose = require('mongoose');
// in .env define MONGODB_URI="mongodb://heroku_lrt6r3tx:md64rsngoqneflgib1pkdbel84@ds155577.mlab.com:55577/heroku_lrt6r3tx"
const url = app.get('env') == "production" ? process.env.MONGODB_URI : "mongodb://localhost:27017/MidClan-Api";

console.log("Environment is ", app.get('env'));

mongoose.connect(url, {
        useNewUrlParser: true
    })
    .then(success => console.log("Connection to mongoose successful"))
    .catch(err => console.error("Could not connect to mongoose ", err));

mongoose.set('useCreateIndex', true);

process.on('exit', () => {
    // mongoose.close();
    mongoose.connection.close();
})


module.exports = mongoose;
