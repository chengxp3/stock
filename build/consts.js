'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  //MySql
  mysql: {
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'stock',
    port: 3306
  },
  //后台安全措施:跨域白名单
  whiteOrigins: ['http://localhost:8080', 'http://localhost:3000',
  // 以下两个是在 线上 配置的 host，xxx 替换为自己的域名
  'http://host'],
  errorsMap: {
    '401': 'Auth failed',
    '500': 'Server Error',
    '403': 'Request Forbidden',
    '404': 'Not found'
  }
};