var express = require('express');
var app = express();

/* GET home page. */
app.get('/', function(req, res, next) {
  res.status(200).json({
    success: true,
    message: 'welcome to MidClan API'
  });
});

module.exports = app;
