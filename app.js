var path = require("path");
global.GLOBAL_PATH = path.resolve(__dirname);
global.MODELS = require(`${GLOBAL_PATH}/models`);
global.DAO = require(`${GLOBAL_PATH}/dao`);

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require("./routes/")(app);

module.exports = app;
