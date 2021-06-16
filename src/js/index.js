//  导入当前页面对应的css
 require('../css/index.css');
  
//  立即执行
  document.ready(function(){
 // 获取倒计时DOM节点
 let countDown =document.querySelector('.countDown')
 // 获取跳转页面dom节点
 let go=document.querySelector(".go")
// 定时器
let i=5;
 let t=setInterval(function(){
   countDown.innerHTML=i;
   i--;
   if(i<0){
     clearTimeout(t);
     //  window.navigate('../page/login.html')
     window.location.href="./login.html";
   }
 },1000)
 // 点击跳转
 go.addEventListener("click",function(){
   window.location.href="./login.html";
 })
  })
 