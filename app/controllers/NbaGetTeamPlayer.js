/**
 *@获取某只球队的阵容
 *@createTime 2018-11-20 10:41:52
 *@author kevin_D.C
 */
const express = require('express');
const app = express();
//引入模型文件
const NbaGetTeamPlayerModel = require('../models/NbaGetTeamPlayerModel');
//处理请求
app.get('/',function(request,response){
  //球队id
  let teamId = request.query.teamId;  
  //调用模型
  NbaGetTeamPlayerModel(teamId,response);     
});

//导出
module.exports = app;