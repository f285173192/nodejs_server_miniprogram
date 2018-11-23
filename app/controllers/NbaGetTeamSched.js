/**
 *@获取一只球队的比赛赛程
 *@createTime 2018-11-20 10:41:52
 *@author kevin_D.C
 */
const express = require('express');
const app = express();
//引入模型
const NbaGetTeamSchedModel = require('../models/NbaGetTeamSchedModel');

app.get('/',function(request,response){
   //球队id
   let teamId = request.query.teamId;
   //当前月份
   let month = request.query.month;
   //调用模型
   NbaGetTeamSchedModel(teamId,month,response);    
})
//导出
module.exports = app;