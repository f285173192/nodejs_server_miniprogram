//导入配置文件
const config = require('./config');
const express = require('express');
const app = express();
const router = express.Router();
//验证签名函数
const checkSinger = require('./utils/checkSinger'); 
//设置响应头
app.all('*', function (request,response,next) {
  response.header('Access-Control-Allow-Headers', 'X-Requested-With');
  response.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  response.header('X-Powered-By', ' 3.2.1');
  //加密字符串
  let md5str = request.query.md5str;
  //时间戳
  let timestamp = request.query.timestamp;
  //验证签名
  let checkToken = checkSinger(md5str,timestamp); 
  if(checkToken !="success"){
	   response.send({isSuccess: 0,type: 'checkToken'})
	   return false;        
   } 
   next();
});
var path ='./app/controllers/';
//请求Fox_nba列表数据
app.use('/News/FOX_LIST',require(path+'FoxNewsList'));
//请求Fox内容详情页内容
app.use('/News/Contents',require(path+'FoxNewsContents'));

//请求网易nba列表数据
app.use('/News/NBA_LIST',require(path+'NbaNewsList'));
//请求网易nba详情页内容
app.use('/News/cdetail',require(path+'NbaNewsContents'));

//请求比赛赛程（三天，上拉获取当天后的，下拉获取当天前的）
app.use('/TeamSchedule/teamSchedule',require(path+'NbaTeamSched'));
//刷新赛程中的当天的比赛比分
app.use('/MatchLive/upCurScore',require(path+'NbaUpCurScore'));

//请求球队排名
app.use('/TeamRank/teamRank',require(path+'NbaTeamRank'));
//请求球队详情
app.use('/TeamRank/getTeamDeail',require(path+'NbaTeamDetail'));
//请求获取某只球队的赛程
app.use('/TeamSchedule/getTeamSched',require(path+'NbaGetTeamSched'));
//请求获取球队阵容
app.use('/PlayerDetail/getTeamPlayer',require(path+'NbaGetTeamPlayer'));

//球员详情
app.use('/PlayerDetail/getPlayerDetail',require(path+'NbaPlayerDetail'));

//直播详情
app.use('/MatchLive/getMatchLive',require(path+'NbaMatchLive'));
//通过日期和主队名称获取schid和liveid
//app.use('/MatchLive/getSchid',require('./routes/web/NbaGetSchid'));

//console.log(require('./routes/web/newsList'));
// app.use('/News/FOX_LIST',function(req,res){
//     console.log(req.query.page);
//     console.log(req.query.md5str);
//     console.log(req.query.timestamp);   
// });

app.use(router);
//请求端口5757
app.listen(config.port);

module.exports = app;


