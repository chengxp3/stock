'use strict';

import express from 'express'
import Ctrl from './controller'

const routers = express.Router()

routers.get('/stock/all/:page', (req, res, next) => {
    const page = req.params.page;
    Ctrl.allStock(page,(data)=>{
        res.json(data)
    },(err)=>{
        res.status(500).json({ error: err })
    });
})

routers.get('/stockInfo/:id', (req, res, next) => {
    const id = req.params.id;
    Ctrl.stock(id,(data)=>{
        res.json(data)
    },(err)=>{
        res.error(err)
    });
})

export default routers
