import pkg from '../package.json'
import consts from './consts'
import mysql from 'mysql'
import PyShell from 'python-shell'

export function Debug(type) {
    try {
        let debug = require('debug')
        return debug(`${pkg.name}:v${pkg.version}:${type}`)
    } catch (err) {
        return () => {}
    }
}

export const pool = mysql.createPool(consts.mysql);

export function pyCtrl(py,cmd) {
    const options = {
        scriptPath: '/Users/cheng/Desktop/App/stock/server/pyhton/',
        args:[cmd]
    };
    let _startTime = new Date();
    PyShell.run(py, options, function(err) {
        let _now = new Date(); //获取时间 t2
        let _deltaTime = _now - _startTime;
        if (err) throw err;
        console.log('py finished time : ' + _deltaTime);
    })
}
