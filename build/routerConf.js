'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.router = undefined;
exports.uncaughtException = uncaughtException;
exports.CORS = CORS;
exports.errorHandler = errorHandler;
exports.responseTime = responseTime;
exports.notFound = notFound;

var _domain = require('domain');

var _domain2 = _interopRequireDefault(_domain);

var _routers = require('./routers');

var _routers2 = _interopRequireDefault(_routers);

var _consts = require('./consts');

var _consts2 = _interopRequireDefault(_consts);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = (0, _utils.Debug)('routes:index');

var router = exports.router = _routers2.default;

function uncaughtException(req, res, next) {
    var d = process.domain || _domain2.default.create();

    d.add(req);
    d.add(res);
    d.on('error', function (err) {
        console.error('uncaughtException url=%s, msg=%s', req.url, err.stack || err.message || err);

        if (!res.finished) {
            res.statusCode = 500;
            res.setHeader('content-type', 'application/json; charset=UTF-8');
            res.end('uncaughtException');
        }
    });

    d.run(next);
}

function CORS(req, res, next) {
    var origin = req.headers.origin;

    if (_consts2.default.whiteOrigins.indexOf(origin) !== -1) {
        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE');
    }

    next();
}

function errorHandler(err, req, res, next) {
    var code = err.message || 500;
    var message = _consts2.default.errorsMap[code];
    debug(code, message);
    res.status(code);
    if (!req.xhr) return res.end(message);
    return res.json({
        code: 99,
        message: message
    });
}

function responseTime(req, res, next) {
    req._startTime = new Date(); // 获取时间 t1
    var calResponseTime = function calResponseTime() {
        var now = new Date(); //获取时间 t2
        var deltaTime = now - req._startTime;
        console.log('path : ' + req.originalUrl + ' time : ' + deltaTime);
    };
    res.once('finish', calResponseTime);
    res.once('close', calResponseTime);
    next();
}

function notFound(req, res, next) {
    res.status(404);
    res.end(_consts2.default.errorsMap[404]);
}