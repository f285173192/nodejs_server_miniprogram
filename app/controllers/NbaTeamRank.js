/**
 *@获取东西部球队排名
 *@createTime 2018-11-20 10:41:52
 *@author kevin_D.C
 */
const express = require('express');
const app = express();
//引入模型文件
const NbaTeamRankModel = require('../models/NbaTeamRankModel'); 
//处理请求
app.get('/',function(request,response){
	  //加密字符串
    let md5str = request.query.md5str;
    //时间戳
    let timestamp = request.query.timestamp;
    //分区id
    let dId = request.query.dId;
    //调用模型
    NbaTeamRankModel(md5str,timestamp,dId,response);    
});
//导出
module.exports= app;