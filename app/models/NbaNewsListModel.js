/**
 *@获取nba中文新闻列表模型
 *@createTime 2018-11-20 10:41:52
 *@author kevin_D.C
 */
const Server = require('../../utils/httpServer');
//无图默认图片
const def_con_img = "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4269334194,1009970194&fm=26&gp=0.jpg";
//引入配置文件
const config = require('../../config');
const NbaNewsListModel = (offset,response)=>{  
   //所请求的主机域名
   let host = config.whost;
   //把参数放到对象中(由于get请求，参数放到了地址中，所以置空)
   let param = {};       
   //path
   let path = `/touch/reconstruct/article/list/BD2AQH4Qwangning/${offset}-15.html`;
   //false:http请求  true:https请求
   Server.httpGet(host, param, path, true).then(function (body) {
   	    //let list = JSON.parse(body);
   	   let list =JSON.parse(body.slice(9,-1))['BD2AQH4Qwangning'];
   	   let data = [];
   	   let k = 0;
   	    for(let i in list){
   	    	let modelmode = (list[i]['modelmode'] != undefined) ? list[i]['modelmode'] : '';
   	    	if(modelmode!='u'){ 
   	    		data[k] = {
   	    			  'id': list[i]['docid'],
   	    			  'title': list[i]['title'],
   	    			  'author': list[i]['source'],
   	    			  'newsimg': list[i]['imgsrc'] ? list[i]['imgsrc'] : def_con_img,
   	    			  'add_time': list[i]['ptime']
   	    			}
   	    		++k;
   	    	}   
   	    }   
      response.send({isSuccess: 1,data: data,type: 'newsList'})          
   }).catch(function (err){ 
       response.send({isSuccess: 0,type: 'newsList'})
   });   
} 

module.exports = NbaNewsListModel;
