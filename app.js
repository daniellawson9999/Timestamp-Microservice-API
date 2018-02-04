const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const morgan = require('morgan');
const path = require('path');
const favicon = require('serve-favicon');

//set port to 3000 for local, or environment variable
const port = process.env.PORT || 3000;
//get router
const router = require('./routes/router');

const app = express();

//initialize middleware
app.use(favicon(path.join(__dirname, 'public','images', 'clock.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));

//set view engine to jade
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'pug');

//set routes here
app.use('/',router);

app.use(errorHandler());
app.listen(port);

/*
Example usage:
https://timestamp-ms.herokuapp.com/December%2015,%202015
https://timestamp-ms.herokuapp.com/1450137600
Example output:
{ "unix": 1450137600, "natural": "December 15, 2015" }
*/
