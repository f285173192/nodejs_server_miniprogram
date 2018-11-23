/**
 *@获取nba fox英文文新闻列表模型
 *@createTime 2018-11-23 11:52:02
 *@author kevin_D.C
 */
const Server = require('../../utils/httpServer');
//把 HTML 实体转换为字符。
const HtmlDecode = require('../../utils/htmlEntityDecode');
//引入配置文件
const config = require('../../config');
//无图默认图片
const def_con_img = "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4269334194,1009970194&fm=26&gp=0.jpg";
const FoxNewsListModel = (md5str,timestamp,page,response)=>{
   //所请求的主机域名
   let host = config.ohost;
   //把参数放到对象中(由于get请求，参数放到了地址中，所以置空)
   let param = {};   
   //path
   let path = `/getFoxNewsList?serCheck=${md5str}&timestamp=${timestamp}&page=${page}`;
   // false:http请求  true:https请求
   Server.httpGet(host, param, path, true).then(function (body) {
      //JSON.parse() 方法用于将一个 JSON 字符串转换为对象。
      let list = JSON.parse(body);
      //循环处理返回的数据
      for(let i in list['data']){
      	 //把标题中的HTML实体转换为字符并截取字符串
      	 list['data'][i]['title'] = HtmlDecode(list['data'][i]['title']).substring(0,100);
      	 //把简介中的HTML实体转换为字符并截取字符串
         list['data'][i]['discribtion'] = HtmlDecode(list['data'][i]['discribtion']);
         list['data'][i]['newsimg'] =  list['data'][i]['newsimg'] ? list['data'][i]['newsimg'] : def_con_img;	  
      }
      response.send({isSuccess: 1,data: list['data'],type: 'newsList'})
    }).catch(function (err) {response.send({isSuccess: 0,type: 'newsList'});})
}
module.exports = FoxNewsListModel;