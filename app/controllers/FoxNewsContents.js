/**
 *@获取nba英文新闻详情
 *@createTime 2018-11-20 10:41:52
 *@author kevin_D.C
 */
const express = require('express');
const app = express();
//引入模型文件
const FoxNewsContentsModel = require('../models/FoxNewsContentsModel');
//处理请求
app.get('/',function(request,response){
    //加密字符串
    let md5str = request.query.md5str;
    //时间戳
    let timestamp = request.query.timestamp;    
    //文章id
    let id = request.query.id;
    //调用模型
    FoxNewsContentsModel(md5str,timestamp,id,response);
});

module.exports = app;