/**
 *@获取一只球队的详细信息
 *@createTime 2018-11-20 10:41:52
 *@author kevin_D.C
 */
const express = require('express');
const app = express();
//引入模型
const NbaTeamDetailModel = require('../models/NbaTeamDetailModel');

//处理请求
app.get('/',function(request,response){
    //球队id
    let teamId = request.query.teamId;    
    //调用模型
    NbaTeamDetailModel(teamId,response);    
});

//导出
module.exports = app;