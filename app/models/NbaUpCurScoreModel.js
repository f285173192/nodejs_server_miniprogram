/*
 *@刷新赛程中当天的比赛比分模型
 *@creatTime 2018-11-20 10:49:56
 *@author kevin_D.C
 */
const mysql = require('mysql');
const Server = require('../../utils/httpServer');
const timestampToFormat = require('../../utils/timestampToFormat');
//引入配置文件
const config = require('../../config');

const NbaUpCurScoreModel = (response)=>{
   //Y-m-d	
   let currentDate = timestampToFormat(Date.parse(new Date()),'formatB');
   //感恩节
   if(currentDate=='2018-11-23'){
   	   currentDate = timestampToFormat(Date.parse(new Date())+1*86400*1000,'formatB');
   }
   let param = {};
   //所请求的主机域名
   let host = config.nhost;
   //path
   let path = `/nba/api/schedule@getList?md=${currentDate}&sid=`;
   //连接池
   const db=mysql.createPool({host:config.mysql.host, user:config.mysql.user, password:config.mysql.pass, database: config.mysql.db});
   //const db=mysql.createPool({host: 'localhost', user: 'root', password: '', database: 'lianxi'});
   //false:http请求  true:https请求
   Server.httpGet(host, param, path, true).then(function (body) {
       let list = JSON.parse(body)['schedule@getList']['data']['list'];
       let data = [];
       let data_end = [];
       for(let i in list){
       	  //比赛状态(已结束)
       	  if(list[i].match_status=='已结束'){
       	  //已经结束更新数据库信息
          getTeamId(db,list[i].hometeamname).then(function(resultHome){
   	  	   	    var hometeamname_id = resultHome[0].id;  
                getTeamId(db,list[i].visitteamname).then(function(resultVisit){
                    var visitteamname_id = resultVisit[0].id; 
                    let sql = "update nba_schedule set homegrede = "+list[i].homescore+", awaygrede="+list[i].visitscore+", matchstatus=2 where hometeam="+hometeamname_id+" and awayteam="+visitteamname_id+" and matchtime between '"+timestampToFormat(Date.parse(new Date()),'formatB')+"' and '"+timestampToFormat((Date.parse(new Date())+1000*60*60*24),'formatB')+"'";
                     console.log(sql);
                   db.getConnection(function(err1, connection){
                     connection.query(sql, (err2, data)=>{
                          connection.release();
                     });                    	  
                   }) 
                });
       	  	});
       	  	//比赛状态         	  	 
            var matchStatus = 2;
       	  }else if(list[i].match_status==''){
                 matchStatus = 0; 
       	  }else{
                 matchStatus = 1;
       	  }
          data[i]={
          	 'id':        list[i].schid, //赛程id
          	 'awayteam':  list[i].visitteamname,//客队信息
          	 'hometeam':  list[i].hometeamname,//主队信息
             'awaygrede': list[i].visitscore,//客队比分
             'homegrede': list[i].homescore,//主队比分
             'awaylogo':  list[i].visitteamlogo,//客队logo
             'homelogo':  list[i].hometeamlogo,//主队logo
             'matchtime': list[i].time,//比赛时间
             'matchStatus': matchStatus,//比赛状态(2已结束，1比赛中,0未开始)
             'datetime':  currentDate,//格式化比赛日期
             'matchTimestamp': Date.parse(new Date(currentDate+' '+list[i].time))
          }
       }
       data_end[0]={'time':currentDate,'list':data};
       response.send({isSuccess:1, data:data_end, type:'upScore'});
   }).catch(function(err){
       response.send({isSuccess:0,type:'upScore'});        
   })      
}
//获取球队id
const getTeamId = (db,teamName)=>{
	//Promise返回mysql结果
	return new Promise((resolve,reject) =>{ 
	  let sql = "select id,logo from nba_teaminfo where name like '%"+teamName+"%'";
		db.getConnection(function(err1, connection){
	        connection.query(sql, (err2, data)=>{
			   if(data){
			     resolve(data);
			     connection.release();
			   }
			});			
		});
	}); 
}

 
module.exports = NbaUpCurScoreModel;