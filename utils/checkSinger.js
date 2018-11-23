//引入配置文件
const config = require('../config');
//引入md5加密函数
var md5 = require('./secret_md_5');
//console.log(config);

/**
 *@验证签名
 *@creatTime 2018-11-17 20:14:51
 *@用本地预埋token和服务传来的时间戳进行验证
 */
 const checkSiner = (md5str,timestamp)=>{
 	//本地md5
    let localMd5String = md5tostr(timestamp);
    //服务器时间戳和客户端时间戳比较不能超过4秒
    let timeDiff = getTimestamp() - timestamp;
    if((localMd5String == md5str) && (timeDiff<=4000)){
       return "success";
    }else{
       return "error";
    }
 }


//返回时间戳
const getTimestamp = () =>{
  return Date.parse(new Date());
}
/**
 *@生成md5字符串
 *@creatTime 2018-11-17 20:06:58
 *@author kevin_D.C
 *@timestamp 客户端时间戳
 */
const md5tostr=(timestamp)=>{
  return md5.hex_md5(config.appToken+timestamp);
}
//导出
module.exports = checkSiner;
