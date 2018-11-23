/*
 *@获取比赛赛程（三天，上拉获取当天后的，下拉获取当天前的）
 *@creatTime 2018-11-20 10:40:39
 *@author kevin_D.C
 */
const express = require('express');
const app = express();
//引入模型
const NbaTeamSchedModel = require('../models/NbaTeamSchedModel'); 
app.use('/',function(request,response){
   let page = request.query.page;
   //调用模型
   NbaTeamSchedModel(page,response);
});
//导出
module.exports = app;