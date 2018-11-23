/*
 * @Author: kevin_dc
 * @Date: 2018-11-17 15:54:44
 * @Last Modified by: kevin_dc
 * @Last Modified time: 2018-11-17 15:55:01
 */
//导入http模块
let http = require('http');
//导入querystring模块
const querystring = require('querystring');

/**
 * http get网络请求封装
 * @param {string} 域名
 * @param {obj} 参数
 * @param {string} 接口路径
 * @param {bool} true false 是否为https
 * @returns
 */

 function httpGet (host, data, path, status) {
 // console.log('===================HttpGet=====================')
  let options = {
    host: host,
    port: 80,
    path: path + querystring.stringify(data),
    method: 'GET',
    encoding: null,
    headers: {
      'Content-Type': 'application/json',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36'
    }
  }
  // 判断是否为https请求
  if (status) {
    http = require('https');
    options.port = 443;
  }

  return new Promise(function (resolve, reject) {
    let body = '';
    let getReq = http.request(options, function (response) {
      // response.setEncoding('utf8');
      //有数据到达时候触发
      response.on('data', function (chunk) {
        body += chunk;
      })
      //数据全部到达时候触发
      response.on('end', () => {
        resolve(body);
      })

      response.on('error', err => {
        reject(err);
      })
    })
    getReq.end();
  })
}
//导出
module.exports = {
  httpGet
}