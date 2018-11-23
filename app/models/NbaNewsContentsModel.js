/**
 *@获取nba中文详情模型
 *@createTime 2018-11-20 10:41:52
 *@author kevin_D.C
 */
const Server = require('../../utils/httpServer');
//把 HTML 实体转换为字符。
const HtmlDecode = require('../../utils/htmlEntityDecode');
//引入配置文件
const config = require('../../config');
//无图默认图片
const def_con_img = "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4269334194,1009970194&fm=26&gp=0.jpg";
const NbaNewsContentsModel = (id,response)=>{  
    //请求的域名
    let host = config.whost;
    //把参数放到对象中(由于get请求，参数放到了地址中，所以置空)
    let param = {};  
    //path
    let path = `/touch/article/${id}/full.html`;
    // false:http请求  true:https请求
    Server.httpGet(host, param, path, true).then(function (body){
	     let content = JSON.parse(body.slice(12,-1));
	     let data = [];
	     data[0] = {
	     	    'id':content[id]['docid'],
	     	    'title':content[id]['title'],
	     	    'author':content[id]['source'],
	     	    'newsimg':content[id]['img'][0]['src'] ? content[id]['img'][0]['src'] : def_con_img,
	     	    'contents':content[id]['body'],
	     	    'add_time':content[id]['ptime']
	     	    };
	     //返回数据
	     response.send({isSuccess: 1,contents: data,type: 'detail'});
    })
     .catch(function(err){
	     response.send({isSuccess: 0,type: 'detail'}); 
    }); 
 }

module.exports = NbaNewsContentsModel;