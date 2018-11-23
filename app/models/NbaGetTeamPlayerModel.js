/**
 *@获取某只球队的阵容模型
 *@createTime 2018-11-23 14:37:06
 *@author kevin_D.C
 */
const Server = require('../../utils/httpServer');
//引入配置文件
const config = require('../../config');

const NbaGetTeamPlayerModel = (teamId,response)=>{
   //存放数据的服务器域名 
   let host = config.lhost;
   //把参数放到对象中(由于get请求，参数放到了地址中，所以置空)
   let param = {};     
   let path = `/g/s?aid=action_api&module=nba&action=team_player&teamId=${teamId}&sid=`;
   //get获取数据
   Server.httpGet(host, param, path, true).then(function(body){
       let list = JSON.parse(body)['team_player']['players'];
       response.send({isSuccess: 1,data: list,type: 'teamPlayerDetail'});
   }).catch(function(err){
       response.send({isSuccess: 0,type:'teamPlayerDetail'});
   })   
}

//导出
module.exports = NbaGetTeamPlayerModel;