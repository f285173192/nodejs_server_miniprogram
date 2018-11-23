/*
 *@获取比赛赛程（三天，上拉获取当天后的，下拉获取当天前的）模型
 *@creatTime 2018-11-20 10:40:39
 *@author kevin_D.C
 */
const mysql = require('mysql');
const Server = require('../../utils/httpServer');
const timestampToFormat = require('../../utils/timestampToFormat');
const getDataGroup = require('../../utils/getDataGroup');
//引入配置文件
const config = require('../../config');
const NbaTeamSchedModel = (page,response)=>{
   //连接池
   const db=mysql.createPool({host:config.mysql.host, user:config.mysql.user, password:config.mysql.pass, database: config.mysql.db});       
   //db.connect();
   //const db=mysql.createPool({host: 'localhost', user: 'root', password: '', database: 'lianxi'});
   //
   /**
    *@判断客户端传过来的页码是否位负数，为负则请求的是当前日期之前的数据
  	*@starttime 当前日期的前三天，页码为-2再减去3天的时机戳 以此类推
  	*@endtime 当前日期的前一天，页码为-2再减去3天的时机戳 以此类推
  	*@returntype 返回给客户端的类型
  	*/
	 //定义变量
   var starttime;  
   var endtime;  
   var returntype;              
   if(page<0){
        currentpage = (page !=undefined) ? page : -1;//结束日期
        starttime = timestampToFormat(((Date.parse(new Date())-(3*86400*1000)) - ((Math.abs(currentpage)-1)*3*86400*1000)),'formatD');  
        endtime = timestampToFormat(((Date.parse(new Date())-(1*86400*1000)) - ((Math.abs(currentpage)-1)*3*86400*1000)),'formatD');  
        returntype = 'upTeamSchedule';        
   }else{
       //当前页
        currentpage = (page !=undefined) ? page : 1;
       //开始日期
        starttime = timestampToFormat((Date.parse(new Date()) + ((Math.abs(currentpage)-1)*3*86400*1000)),'formatD');  
       //结束日期
        endtime = timestampToFormat(((Date.parse(new Date())+(2*86400*1000)) + ((Math.abs(currentpage)-1)*3*86400*1000)),'formatD');          
        returntype = 'TeamSchedule';   	   
   }
   let sql="SELECT a.id,a.hometeam,a.awayteam, a.homegrede, a.awaygrede, a.matchtime, a.matchcat, a.matchstatus,b.name as hname,b.logo as hlogo,c.name as aname,c.logo as alogo from nba_schedule as a LEFT JOIN nba_teaminfo as b on a.hometeam = b.id left JOIN nba_teaminfo as c on a.awayteam = c.id where DATE_FORMAT(a.matchtime,'%Y%m%d') BETWEEN "+starttime+" AND "+endtime+"";
   db.getConnection(function(err1, connection) {
   connection.query(sql,function(err2,data){
   	//没有数据时
    if(data[0] == undefined){
    	 response.send({isSuccess:0,type:returntype});
    	 connection.release();
    	 return false;          
    }
   	var data_list = [];
	    for(let i in data){
	      data_list[i] = 
	      {
	      	  'id': data[i].id,
	          'awayteam' : data[i].aname.split('-')[1],//客队名字
	          'hometeam' : data[i].hname.split('-')[1],//主队名字
	          'awaygrede': data[i].awaygrede,//客队比分
	          'homegrede': data[i].homegrede,//主队比分
	          'awaylogo' : data[i].alogo,//客队logo
	          'homelogo' : data[i].hlogo,//主队logo
	          'matchtime': timestampToFormat(new Date(data[i].matchtime).getTime(),'formatE'),//比赛时间
	          'months'   : timestampToFormat(new Date(data[i].matchtime).getTime(),'formatF'),//date('Y年m月d日',strtotime($val['matchtime']))." ".getWeek(date("Y-m-d",strtotime($val['matchtime']))),//比赛月日
	          'time'     : timestampToFormat(new Date(data[i].matchtime).getTime(),'formatC'),
	          'datetime' : timestampToFormat(new Date(data[i].matchtime).getTime(),'formatB'),//date('Y-m-d',strtotime($val['matchtime'])),//格式化比赛日期
	          'matchStatus': data[i].matchstatus,
	          'matchTimestamp': new Date(data[i].matchtime).getTime()//strtotime($val['matchtime']).'000'
	      }       
	    }
        let data_end = getDataGroup(data_list); 
        response.send({isSuccess:1,data:data_end,type:returntype}) 
        //关闭数据库连接
   	    connection.release();         
     });
   }); 
}
//导出
module.exports = NbaTeamSchedModel;