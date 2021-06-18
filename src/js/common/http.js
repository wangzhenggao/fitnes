/* 
 * 特殊字符串封装处理 
 * 作者:汪正高  2021/6/9
  */ 
function urlData(obj) {
    let str = '';
    //如果调用get 请求只有两个参数 不拼接参数
    if (typeof obj === 'function') {
        return '';
    }
    //将对象的属性名 及 值 拿出来拼接字符串
    let arr = Object.keys(obj);
    for (let i = 0; i < arr.length; i++) {
        str += '&' + arr[i] + '=' + obj[arr[i]];
    }
    str = str.substr(1);

    return str;
}





/*
 * ajax封装
 * 
 * 作者:汪正高   2021/6/9
 */

let http={
    // get请求
    get:function(url,data,callback){
        if(typeof data =='function'){
            callback=data;
        }
        let xhr=new XMLHttpRequest();
        // 请求方式 +数据
        xhr.open('get',url+'?'+urlData(data))
        // 监听ajax
        xhr.onreadystatechange=function(){
            // 判断步骤  和http状态码
            if(xhr.readyState===4 && xhr.status===200){
                // 通过回调函数把数据传回去: 传回去的事件要将拿到的json数据类型转换成js复杂数据类型
                callback(JSON.parse(xhr.responseText));
            }
    }
    // 发送数据
    xhr.send(data);
    },
    // post
    post:function(url,obj,callback){
        // 实例化一个ajax
       let xhr=new XMLHttpRequest();
    // 请求方式   + 请求地址
        xhr.open('post',url);
    // post请求 修改请求头
        xhr.setRequestHeader('Content-Type', 'application/json');
    // 监听ajax事件
        xhr.onreadystatechange=function(){
            // 判断步骤 状态码
            if(xhr.readyState === 4&&xhr.status === 200){
                callback(JSON.parse(xhr.responseText));
            }
        }
    // 发送  +数据
        xhr.send(JSON.stringify(obj))
    },


    // 封装万能ajax请求
    ajax:function({url,type,data,success}){
    //    console.log(type);
    if(type=='get'){
        let xhr=new XMLHttpRequest();

    // 请求方式 +数据
    xhr.open('get',url+'?'+urlData(data))
    // 监听ajax
    xhr.onreadystatechange=function(){
        // 判断步骤  和http状态码
        if(xhr.readyState===4 && xhr.status===200){
            // 通过回调函数把数据传回去: 传回去的事件要将拿到的json数据类型转换成js复杂数据类型
            success(JSON.parse(xhr.responseText));
        }
    }
    // 发送数据
    xhr.send(data);
    }

    else if(type='post'){
 // 实例化一个ajax
 let xhr=new XMLHttpRequest();
 // 请求方式   + 请求地址
     xhr.open('post',url);
 // post请求 修改请求头
     xhr.setRequestHeader('Content-Type', 'application/json');
 // 监听ajax事件
     xhr.onreadystatechange=function(){
         // 判断步骤 状态码
         if(xhr.readyState === 4&&xhr.status === 200){
            success(JSON.parse(xhr.responseText));
         }
     }
    //  console.log(data);
 // 发送  +数据
     xhr.send(JSON.stringify(data))
    }
    }

}


// 文件上传
function $updateFile(url, fdKey, fdValue, success) {
    const xhr = new XMLHttpRequest();
  
    const fd = new FormData();
    fd.append(fdKey, fdValue);
  
    xhr.open('POST', url);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const resData = JSON.parse(xhr.responseText)
        success(resData)
      }
    }
    xhr.send(fd);
  }
  
  window.$updateFile = $updateFile

// 挂载在windo上面
window.$http=http;