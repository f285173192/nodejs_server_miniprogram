/**
 *@获取一只球队的详细信息模型
 *@createTime 2018-11-20 10:41:52
 *@author kevin_D.C
 */
const Server = require('../../utils/httpServer');
//引入配置文件
const config = require('../../config');
const NbaTeamDetailModel = (teamId,response)=>{
    //存放数据的服务器域名
    let host = config.lhost;
    //把参数放到对象中(由于get请求，参数放到了地址中，所以置空)
    let param = {};  
    //path
    let path = `/g/s?aid=action_api&module=nba&action=team_detail&teamId=${teamId}&sid=`;
    Server.httpGet(host, param, path, true).then(function(body){
    	 let list = JSON.parse(body)['team_detail'];
    	 response.send({isSuccess: 1,data: list,type: 'teamDetail'});
    }).catch(function(err){
       response.send({isSuccess: 0,type: 'teamDetail'});        
    })        
 }
//导出
module.exports = NbaTeamDetailModel;