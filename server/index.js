'use strict';

// Global dependencies
import path from 'path'
import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

// Local dependencies
import {
    router,
    uncaughtException,
    CORS,
    errorHandler,
    notFound,
    responseTime
} from './routerConf'
import Ctrl from './controller'
import schedule from 'node-schedule'
import { pool,pyCtrl } from './utils.js'

// Init Express App
const app = express()

// Middlewares and Routes
app.use(express.static('dist'))
    // app.use(require('./cloud').default) // to fit babel 6.x
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(uncaughtException)
app.all('/api/*', CORS)
app.all('/*',responseTime)
// APIs setup
app.use('/api', router)

// Error handlers
app.use(errorHandler)
app.use(notFound)

//schedule for getStock

const rule = new schedule.RecurrenceRule();

rule.dayOfWeek = [0,1,2,3,4,5,6];
rule.hour = [11,23];
rule.minute = 41;

const getStock = schedule.scheduleJob(rule, function() {
    console.log("get py stock list");
    pyCtrl('shell.py','getList');
});

const PORT = 3000

app.listen(PORT, () =>
    console.log('Stock app is running on port: ', PORT))
