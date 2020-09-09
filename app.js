var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose'); //Will be using Mongoose to connect to our Database in this 'app.js' file.
var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./routes/new.js')(app);
require('./routes/home.js')(app);
require('./routes/delete.js')(app);
require('./routes/update.js')(app); //HYPERION note: For more information about this approach to separate routes, see here:https://stackoverflow.com/questions/6059246/how-to-include-route-handlers-in-multiple-files-in-express
require('./routes/updateMany.js')(app);
require('./routes/filter.js')(app);

//PROXY PORT
const PORT = process.env.PORT || 3001; 
app.listen(PORT, console.log(`Server is starting at ${PORT}`));

//URI to connect to MongoDB
const uri = "mongodb+srv://NikitaB:projectpassword@my-cluster.rrojr.mongodb.net/db_test?w=majority";
mongoose.Promise = global.Promise;

mongoose.connect(uri, {
	useMongoClient: true
});

mongoose.connection.on('error', function(err) {
	console.log('Connection to Mongo established.');
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});
mongoose.connection.once('open', function() {
    console.log("Successfully connected to the database");
})

// CATCH 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// ERROR handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
