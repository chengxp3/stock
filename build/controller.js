'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _utils = require('./utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//mysql operation
exports.default = {
    allStock: function allStock(page, done, fail) {
        _utils.pool.getConnection(function (err, connection) {
            var size = 100;
            var result = {
                total: 0,
                allPage: 0,
                list: []
            };
            connection.query('select count(*) from stock_list', function (err, results) {
                if (err) {
                    fail(err);
                } else {
                    result.total = results[0]['count(*)'];
                    result.allPage = result.total % size == 0 ? parseInt(result.total / size) : parseInt(result.total / size) + 1;
                    var num = parseInt(size * (page - 1));
                    if (page <= result.allPage) {
                        connection.query('select * from stock_list limit ?,80', [num], function (err, results) {
                            connection.release();
                            if (err) {
                                fail(err);
                            } else {
                                result.list = results;
                                done(result);
                            }
                        });
                    } else {
                        connection.release();
                        result.list = [];
                        done(result);
                    }
                }
            });
        });
    },
    stock: function stock(id, done, fail) {
        _utils.pool.getConnection(function (err, connection) {
            connection.query('select * from stock_list ' + 'join stock_today on ' + 'stock_list.code = stock_today.code ' + 'where stock_list.code=?', id, function (err, results) {
                console.log(results);
                if (err) {
                    fail(err);
                } else {
                    done(results);
                }
            });
        });
    }
};