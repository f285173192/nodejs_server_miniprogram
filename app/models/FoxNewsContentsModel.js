/**
 *@获取nba英文新闻详情数据模型
 *@createTime 2018-11-23 11:16:03
 *@author kevin_D.C
 */
//网络请求
const Server = require('../../utils/httpServer');
//把 HTML 实体转换为字符。
const HtmlDecode = require('../../utils/htmlEntityDecode');
//把时间处理函数
const timestampToFormat = require('../../utils/timestampToFormat');
//引入配置文件
const config = require('../../config');
//无图默认图片
const def_con_img = "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4269334194,1009970194&fm=26&gp=0.jpg";

const FoxNewsContentsModel = (md5str,timestamp,id,response)=>{
    //请求的主机          
    let host = config.ohost;    
    //把参数放到对象中(由于get请求，参数放到了地址中，所以置空)
    let param = {};
    //path
    let path = `/getFoxNewsContent?serCheck=${md5str}&timestamp=${timestamp}&id=${id}`;  
    // false:http请求  true:https请求
    Server.httpGet(host, param, path, true).then(function (body) {
       //JSON.parse() 方法用于将一个 JSON 字符串转换为对象。
       let list = JSON.parse(body);
       //定义一个空数组
       let data = [];
       //把标题中的HTML实体转换为字符并截取字符串
       list['title'] = HtmlDecode(list['title']).substring(0,100);
       //把简介中的HTML实体转换为字符并截取字符串
       list['discribtion'] = HtmlDecode(list['discribtion']);
       //把内容中的HTML实体转换为字符并截取字符串
       list['contents']  = HtmlDecode(list['contents']),
       //判断有无图片
       list['newsimg'] =  list['newsimg'] ? list['newsimg'] : def_con_img;
       //把时间戳转化为格式化时间
       list['add_time'] = timestampToFormat(list['add_time']*1000,'formatA');
       //把list放到空数组的第一个元素上
       data[0] = list;
       response.send({isSuccess: 1,contents: data,type: 'detail'});
      })
      .catch(function (err) {console.log(err);response.send({isSuccess: 0,type: 'detail'})
    })        
}
module.exports = FoxNewsContentsModel;