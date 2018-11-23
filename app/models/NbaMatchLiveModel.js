/**
 *@获取两只球队比赛的直播详情模型
 *@createTime 2018-11-20 10:41:52
 *@author kevin_D.C
 */
const Server = require('../../utils/httpServer');
//引入配置文件
const config = require('../../config');
//通过日期和主队名称获取赛程id和直播id
const getSchedByName = (datetime,hometeam,callBack,response)=>{
   //把参数放到对象中(由于get请求，参数放到了地址中，所以置空)
   let schedParam = {};
   //存放数据的服务器域名
   let schedHost = config.nhost;
   //path
   let schedPath = `/nba/api/schedule@getList?md=${datetime}&sid=`;
   //请求文字直播详情
   var lsId={};
   Server.httpGet(schedHost, schedParam, schedPath, true).then(function(dataSched){
         let list = JSON.parse(dataSched)['schedule@getList']['data']['list'];
         for(let i in list){
            if(list[i].hometeamname == hometeam){
               lsId = {'schid': list[i].schid, 'liveid': list[i].liveid};
               //调用回调函数把赛程id和直播id传给returnMatchData函数，最终返回直播数据
               callBack(lsId,response);
            }
         }
   })   
}
//通过回调函数把赛程id和直播id传给getSchedById函数  
const callBack = (lsId,response)=>{
   getSchedById(lsId.schid,lsId.liveid,response);
}
//返回直播数据
const getSchedById = (schid,liveid,response)=>{
   //获取比赛球队信息
   //存放数据的服务器域名
   let host = 'nb.3g.qq.com';
   //把参数放到对象中(由于get请求，参数放到了地址中，所以置空)
   let param = {};         
   //path
   let path = `/nba/api/live@getInfo?i_schid=${schid}&i_liveid=${liveid}`;
   //向目标服务器发出get请求 请求比赛的两只球队信息
   Server.httpGet(host, param, path, true).then(function(matchTeamDetail){
   	   //比赛的两只球队信息
       var teamDetail = JSON.parse(matchTeamDetail)['live@getInfo']['data'];
       teamDetail['begin_time'] = Date.parse(teamDetail['begin_time']);
       //文字直播
       let liveHost = 'live.3g.qq.com';
       //livePath
       let livePath = `/g/s?aid=action_api&module=nba&action=broadcast_content%2Cbroadcast_info&sch_id=${schid}`;
       //liveParam
       let liveParam = {};
       //请求文字直播详情
       Server.httpGet(liveHost, liveParam, livePath, true).then(function(matchLive){
       	    //文字直播详情
            var teamMatchLive = JSON.parse(matchLive)['broadcast_content']['contentAry'];
            //比赛数据服务器地址
            let matchDataHost = 'live.3g.qq.com';
            //比赛数据path
            let matchDataPath = `/g/s?aid=action_api&module=nba&action=live_stat_4_nba%2Cbroadcast_info&sch_id=${schid}&bid=2009605`
            //matchDataParam
            let matchDataParam = {};
            //请求比赛球队的数据
            Server.httpGet(matchDataHost, matchDataParam, matchDataPath, true).then(function(matchData){
                let teamMatchData = JSON.parse(matchData)['live_stat_4_nba'];
                response.send({
                   isSuccess: 1,
                   live_list: teamMatchLive,
                   schid: schid,
                   liveid: liveid,
                   resultMatchTeam: teamDetail,
                   resultMatchData: teamMatchData,
                   type: 'matchLive'
                });
            }).catch(function(err){
               response.send({isSuccess: 0,type: 'matchLive'});
            })
       }).catch(function(err){
               response.send({isSuccess: 0,type: 'matchLive'});       	   
       });
   }).catch(function(err){
               response.send({isSuccess: 0,type: 'matchLive'});     	   
   });       
}    


//导出
module.exports = {getSchedByName:getSchedByName,getSchedById:getSchedById,callBack:callBack};