'use strict';

// Global dependencies

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _routerConf = require('./routerConf');

var _controller = require('./controller');

var _controller2 = _interopRequireDefault(_controller);

var _nodeSchedule = require('node-schedule');

var _nodeSchedule2 = _interopRequireDefault(_nodeSchedule);

var _utils = require('./utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Init Express App


// Local dependencies
var app = (0, _express2.default)();

// Middlewares and Routes
app.use(_express2.default.static('dist'));
// app.use(require('./cloud').default) // to fit babel 6.x
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use((0, _cookieParser2.default)());
app.use(_routerConf.uncaughtException);
app.all('/api/*', _routerConf.CORS);
app.all('/*', _routerConf.responseTime);
// APIs setup
app.use('/api', _routerConf.router);

// Error handlers
app.use(_routerConf.errorHandler);
app.use(_routerConf.notFound);

//schedule for getStock

var rule = new _nodeSchedule2.default.RecurrenceRule();

rule.dayOfWeek = [0, 1, 2, 3, 4, 5, 6];
rule.hour = [11, 23];
rule.minute = 41;

var getStock = _nodeSchedule2.default.scheduleJob(rule, function () {
    console.log("get py stock list");
    (0, _utils.pyCtrl)('shell.py', 'getList');
});

var PORT = 3000;

app.listen(PORT, function () {
    return console.log('Stock app is running on port: ', PORT);
});