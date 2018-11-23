/**
 *@获取单个球员的详细数据
 *@createTime 2018-11-20 10:41:52
 *@author kevin_D.C
 */
const express = require('express');
const app = express();
//引入模型
const NbaPlayerDetailModel = require('../models/NbaPlayerDetailModel'); 
app.get('/',function(request,response){
   //球员id
   let playerId = request.query.playerId;
   //调用模型
   NbaPlayerDetailModel(playerId,response);    
});

//导出
module.exports = app;