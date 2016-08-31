'use strict';

import domain from 'domain'
import routers from './routers'
import consts from './consts'
import { Debug } from './utils'

const debug = Debug('routes:index')

export const router = routers

export function uncaughtException(req, res, next) {
    let d = process.domain || domain.create()

    d.add(req)
    d.add(res)
    d.on('error', (err) => {
        console.error('uncaughtException url=%s, msg=%s', req.url, err.stack || err.message || err)

        if (!res.finished) {
            res.statusCode = 500
            res.setHeader('content-type', 'application/json; charset=UTF-8')
            res.end('uncaughtException')
        }
    })

    d.run(next)
}

export function CORS(req, res, next) {
    const origin = req.headers.origin

    if (consts.whiteOrigins.indexOf(origin) !== -1) {
        res.header('Access-Control-Allow-Origin', origin)
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Credentials', true)
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE')
    }

    next()
}

export function errorHandler(err, req, res, next) {
    const code = err.message || 500
    const message = consts.errorsMap[code]
    debug(code, message)
    res.status(code)
    if (!req.xhr)
        return res.end(message)
    return res.json({
        code: 99,
        message,
    })
}

export function responseTime(req, res, next) {
    req._startTime = new Date() // 获取时间 t1
    const calResponseTime = function() {
        let now = new Date(); //获取时间 t2
        let deltaTime = now - req._startTime;
        console.log('path : '+req.originalUrl+' time : '+ deltaTime );
    }
    res.once('finish', calResponseTime);
    res.once('close', calResponseTime);
    next();

}

export function notFound(req, res, next) {
    res.status(404)
    res.end(consts.errorsMap[404])
}
