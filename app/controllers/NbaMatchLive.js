/**
 *@获取两只球队比赛的直播详情
 *@createTime 2018-11-20 10:41:52
 *@author kevin_D.C
 */
const express = require('express');
const app = express();
//引入模型文件
const NbaMatchLiveModel = require('../models/NbaMatchLiveModel');
//处理请求
app.get('/',function(request,response){  
   //直播id
   var liveid = request.query.liveid;
   //赛程id
   var schid = request.query.schid; 
   //通过直播id和赛程id调取直播数据    
   if(liveid!=undefined && schid!=undefined){ 
      NbaMatchLiveModel.getSchedById(schid,liveid,response);
   }else{
      //通过日期和主队名称获取直播详细信息   
      //https://xo3f7um3.qcloud.la/MatchLive/getMatchLive?
      //md5str=925194443d695c7e14e3a06714f987aa&timestamp=1542890652000&datetime=2018-11-22&hometeam=%E9%BB%84%E8%9C%82
      //比赛日期
      var datetime = request.query.datetime;
      //比赛主队
      var hometeam = request.query.hometeam;
      NbaMatchLiveModel.getSchedByName(datetime,hometeam,NbaMatchLiveModel.callBack,response);         
   }
      
});

//导出
module.exports = app;