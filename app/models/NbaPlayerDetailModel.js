/**
 *@获取单个球员的详细数据模型
 *@createTime 2018-11-20 10:41:52
 *@author kevin_D.C
 */
const Server = require('../../utils/httpServer');
//引入配置文件
const config = require('../../config');

const NbaPlayerDetailModel = (playerId,response)=>{
   //存放数据的服务器域名
   let host = config.lhost;
   //把参数放到对象中(由于get请求，参数放到了地址中，所以置空)
   let param = {};     
   //path
   let path = `/g/s?aid=action_api&module=nba&action=player_detail&playerId=${playerId}&sid=`;

   Server.httpGet(host, param, path, true).then(function(body){
   	  let list = JSON.parse(body)['player_detail'];
   	  response.send({isSuccess: 1,data: list,type: 'playerDetail'});
   }).catch(function(err){
      response.send({isSuccess: 0,type: 'playerDetail'});      
   });    
}

//导出
module.exports = NbaPlayerDetailModel;