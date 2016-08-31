'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _controller = require('./controller');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routers = _express2.default.Router();

routers.get('/stock/all/:page', function (req, res, next) {
    var page = req.params.page;
    _controller2.default.allStock(page, function (data) {
        res.json(data);
    }, function (err) {
        res.status(500).json({ error: err });
    });
});

routers.get('/stockInfo/:id', function (req, res, next) {
    var id = req.params.id;
    _controller2.default.stock(id, function (data) {
        res.json(data);
    }, function (err) {
        res.error(err);
    });
});

exports.default = routers;