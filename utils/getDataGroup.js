 //根据日期获取分组 for
 //根据日期获取分组 foreach
 //some() 方法用于检测数组中的元素是否满足指定条件（函数提供）。
 //array 和 newAddress都是数字中的每一项
//var arr = [{id:302,awayteam:'魔术',hometeam:'掘金',awaygrede:0,homegrede:0,awaylogo:'http://mat1.gtimg.com/sports/nba/logo/1602/19.png',homelogo:'http://mat1.gtimg.com/sports/nba/logo/1602/7.png',matchtime:'10:00',months:'2018年11月24日 星期六',time:'2018年11月24日',datetime:'2018-11-24',matchStatus:0,matchTimestamp:1543024800000},{id:304,awayteam:'爵士',hometeam:'湖人',awaygrede:0,homegrede:0,awaylogo:'http://mat1.gtimg.com/sports/nba/logo/1602/26.png',homelogo:'http://mat1.gtimg.com/sports/nba/logo/1602/13.png',matchtime:'11:30',months:'2018年11月24日 星期六',time:'2018年11月24日',datetime:'2018-11-24',matchStatus:0,matchTimestamp:1543030200000},{id:305,awayteam:'火箭',hometeam:'骑士',awaygrede:0,homegrede:0,awaylogo:'http://mat1.gtimg.com/sports/nba/logo/1602/10.png',homelogo:'http://img1.gtimg.com/sports/pics/hv1/131/116/2220/144385211.png',matchtime:'08:30',months:'2018年11月25日 星期日',time:'2018年11月25日',datetime:'2018-11-25',matchStatus:0,matchTimestamp:1543105800000},{id:306,awayteam:'鹈鹕',hometeam:'奇才',awaygrede:0,homegrede:0,awaylogo:'http://mat1.gtimg.com/sports/nba/logo/1602/3.png',homelogo:'http://mat1.gtimg.com/sports/nba/logo/1602/27.png',matchtime:'09:00',months:'2018年11月25日 星期日',time:'2018年11月25日',datetime:'2018-11-25',matchStatus:0,matchTimestamp:1543107600000}];
const mapLoction = function(arr) {
let newArr = [];
    arr.forEach((address, i) => {
        //分组后新数组中的data的下标
        let index = -1;
        //遍历心数字中的每一项
        let alreadyExists = newArr.some((newAddress, j) => {
            if (address.time === newAddress.time) {
                index = j;
                return true;
            }
        });
        //第一次遍历由于还没有生成新数组所以alreadyExists为false
        //第一次遍历和address.time === newAddress.time为false时产生一个新数组
        if (!alreadyExists) {
            newArr.push({
                time: address.time,
                data: [address]
            });
        } else {
            //如果address.time === newAddress.time 则把相等的每一项添加到新数组的data中
            newArr[index].data.push(address); 
        }
    });
    return newArr;
}
//mapLoction(arr);
module.exports = mapLoction;