/**
 *@获取nba fox英文文新闻列表
 *@createTime 2018-11-20 10:41:52
 *@author kevin_D.C
 */
const express = require('express');
const app = express();
//引入模型文件
const FoxNewsListModel = require('../models/FoxNewsListModel');
//处理请求
app.get('/',function(request,response){   
   //加密字符串
   let md5str = request.query.md5str;
   //时间戳
   let timestamp = request.query.timestamp;
   //页码
   let page = request.query.page;
   //调用模型
   FoxNewsListModel(md5str,timestamp,page,response);
});
module.exports = app;