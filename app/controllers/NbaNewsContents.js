/**
 *@获取nba中文详情
 *@createTime 2018-11-20 10:41:52
 *@author kevin_D.C
 */
const express = require('express');
const app = express();
//引入模型
const NbaNewsContentsModel = require('../models/NbaNewsContentsModel');
//处理请求
app.get('/',function(request,response){
    let id = request.query.id;
    //调用模型
    NbaNewsContentsModel(id,response);
});

module.exports = app;