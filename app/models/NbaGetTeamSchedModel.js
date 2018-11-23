/**
 *@获取一只球队的比赛赛程模型
 *@createTime 2018-11-20 10:41:52
 *@author kevin_D.C
 */
const Server = require('../../utils/httpServer');
//引入配置文件
const config = require('../../config');
const NbaGetTeamSchedModel = (teamId,month,response)=>{
   //存放数据的服务器域名
   let host = config.nhost;
   //把参数放到对象中(由于get请求，参数放到了地址中，所以置空)
   let param = {};     
   //path
   let path = `/nba/api/schedule@getMonthListByTeam?teamid=${teamId}&mouth=${month}&sid=`;
    
   Server.httpGet(host, param, path, true).then(function(body){
        let list = JSON.parse(body)['schedule@getMonthListByTeam']['data'];
        response.send({isSuccess: 1,data:list,type:'sTeamSched'});
    }).catch(function(err){
        response.send({isSuccess: 0,type:'sTeamSched'});        
    })
}
//导出
module.exports = NbaGetTeamSchedModel;