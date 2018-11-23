/**
 *@获取东西部球队排名模型
 *@createTime 2018-11-20 10:41:52
 *@author kevin_D.C
 */
const Server = require('../../utils/httpServer');
 //引入配置文件
const config = require('../../config');

const NbaTeamRankModel = (md5str,timestamp,dId,response)=>{
    //存放数据的服务器域名
    let host = config.ohost;
    //把参数放到对象中(由于get请求，参数放到了地址中，所以置空)
    let param = {};      
    //path
    let path = `/getTeamRank?serCheck=${md5str}&timestamp=${timestamp}&district=${dId}`;
    // false:http请求  true:https请求//?false时候服务就奔溃，暂不知原因
    Server.httpGet(host, param, path, true).then(function (body) {
     //JSON.parse() 方法用于将一个 JSON 字符串转换为对象。
     let list = JSON.parse(body);
      response.send({isSuccess: 1,data: list,type: 'teamRank'});
    })
    .catch(function (err) {
      response.send({isSuccess: 0,type: 'teamRank'});
    })    
}
//导出
module.exports= NbaTeamRankModel;