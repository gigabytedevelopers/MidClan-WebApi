/**
 * @package - MidClan - WebApi
 * @description - This is the Web  API for the MidClan project
 */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require("body-parser");
const customEnv = require("custom-env").env();
const cors = require("cors");
const corsConfig = require("./config/cors");
const Respond = require('./services/responses');


var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// Routes
const loginRoute = require('./routes/authRoutes/login');
const signupRoute = require('./routes/authRoutes/signup');
const usersRoute = require('./routes/userRoutes/index');
const pharmacistsRoute = require('./routes/pharmacistRoutes/index');
const techniciansRoute = require('./routes/technicianRoutes/index');
const doctorsRoute = require('./routes/doctorRoutes/index');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());
app.use(express.json());

require('./config/mongo'); //connect to mongo database

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/*                                                                                        *
 * Cors is enabled so the client can acces enpoint on this API wthout having to make request *
 *  from the same Origin
 */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", corsConfig.origins);
  res.header("Access-Control-Allow-Headers", corsConfig.headers);
  if (req.method === "OPTIONS") {
    //preflight request
    res.header("Access-Control-Allow-Methods", corsConfig.methods);
    return res.status(200).json({});
  }
  next();
});

// Routes are enabled below

// Authentication Routes
app.use('/api/v1/auth/', loginRoute);
app.use('/api/v1/auth/', signupRoute);
app.use('/api/v1/users/', usersRoute);
app.use('/api/v1/pharmacists/', pharmacistsRoute);
app.use('/api/v1/technicians/', techniciansRoute);
app.use('/api/v1/doctors/', doctorsRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  // next(createError(404));
  next(Respond(res).error(404, 'RouteNotFound', 'This is the end of the earth'));
});

// refactored to work on both dev and prod.
let port;
if (app.get('env') === 'development') {
  port = 3000 || process.env.PORT;
} else {
  port = process.env.PORT;
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})

module.exports = app;
