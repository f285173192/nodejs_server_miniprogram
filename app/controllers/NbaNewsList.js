/**
 *@获取nba中文新闻列表
 *@createTime 2018-11-20 10:41:52
 *@author kevin_D.C
 */
const express = require('express');
const app = express();
//引入模型
const NbaNewsListModel = require('../models/NbaNewsListModel');

//处理请求
app.get('/',function(request,response){
   //接口策略已经改变，page改为offset 0-15(从下标0开始取5条)15-15（从下标15开始取15条） 
   let offset = (request.query.page) ? (request.query.page*15) : 0;
   //调用模型
   NbaNewsListModel(offset,response);        
});

module.exports = app;
