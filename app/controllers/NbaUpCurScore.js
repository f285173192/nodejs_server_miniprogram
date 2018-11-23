/*
 *@刷新赛程中当天的比赛比分
 *@creatTime 2018-11-20 10:49:56
 *@author kevin_D.C
 */
const express = require('express');
const app = express();
//引入模型文件
const NbaUpCurScoreModel = require('../models/NbaUpCurScoreModel'); 
//处理请求
app.use('/',function(request,response){
    NbaUpCurScoreModel(response);
});

module.exports = app;