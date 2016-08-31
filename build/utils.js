'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.pool = undefined;
exports.Debug = Debug;
exports.pyCtrl = pyCtrl;

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

var _consts = require('./consts');

var _consts2 = _interopRequireDefault(_consts);

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

var _pythonShell = require('python-shell');

var _pythonShell2 = _interopRequireDefault(_pythonShell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Debug(type) {
    try {
        var debug = require('debug');
        return debug(_package2.default.name + ':v' + _package2.default.version + ':' + type);
    } catch (err) {
        return function () {};
    }
}

var pool = exports.pool = _mysql2.default.createPool(_consts2.default.mysql);

function pyCtrl(py, cmd) {
    var options = {
        scriptPath: '/Users/cheng/Desktop/App/stock/server/pyhton/',
        args: [cmd]
    };
    var _startTime = new Date();
    _pythonShell2.default.run(py, options, function (err) {
        var _now = new Date(); //获取时间 t2
        var _deltaTime = _now - _startTime;
        if (err) throw err;
        console.log('py finished time : ' + _deltaTime);
    });
}