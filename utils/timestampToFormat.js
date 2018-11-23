/*
 *@根据参数返回时间格式
 *@formatA Y-m-d H:i:s formatB Y-m-d formatC Y年m月d日 formatD Ymd  formatE H:i formatF
 *
 */
const timestampToFormat = (timestamp,foramt) => {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear();
        var m = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
        var d = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate());
        var H = (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours());
        var i = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes());
        var s = (date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds());
        var w = date.getDay();
        var weekday=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
        switch(foramt) {
        	case 'formatA': 
        	   return Y+'-'+m+'-'+d+' '+H+':'+i+':'+s;	
            break;
        	case 'formatB':
        	   return Y+'-'+m+'-'+d; 	
        	break;
        	case 'formatC':
               return Y+'年'+m+'月'+d+'日';
        	break;
        	case 'formatD':
        	  //Y+m+d为加法，所以必须Y+''+m+''+d这样写
        	   return Y+''+m+''+d;
        	break;
            case 'formatE':
               return H+':'+i;
            break;  
            case 'formatF':
               return Y+'年'+m+'月'+d+'日'+' '+weekday[w];
            break;            
        }
    }
module.exports = timestampToFormat;   