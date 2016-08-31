'use strict';


import url from 'url'
import { pool } from './utils.js'

//mysql operation
export default {
    allStock(page,done,fail) {
        pool.getConnection(function(err, connection) {
            let size =100;
            const result = {
                total:0,
                allPage:0,
                list:[]
            }
            connection.query('select count(*) from stock_list',function(err, results) {
                if (err){
                    fail(err)
                }else {
                    result.total = results[0]['count(*)'];
                    result.allPage = result.total % size == 0 ? parseInt(result.total / size) : parseInt(result.total/size) + 1;
                    let num = parseInt(size*(page-1))
                    if(page<=result.allPage){
                        connection.query('select * from stock_list limit ?,80', [num],function(err, results) {
                            connection.release();
                            if (err){
                                fail(err)
                            }else {
                                result.list=results;
                                done(result)
                            }
                        }); 
                    }else{
                        connection.release();
                        result.list=[];
                        done(result)
                    }
                    
                }
            });
        });
    },
    stock(id,done,fail) {
        pool.getConnection(function(err, connection) {
            connection.query('select * from stock_list '+
                'join stock_today on '+
                'stock_list.code = stock_today.code '+
                'where stock_list.code=?',id,function(err, results) {
                console.log(results)
                if (err){
                    fail(err)
                }else{
                    done(results)
                }
            })
        })
    }
}
