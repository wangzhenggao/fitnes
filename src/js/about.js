require('../css/about.less');
document.ready(function(){
    assembly.addFooter('about');
   let outBtn=document.querySelector('.outBtn')
   let out=document.querySelector('.out')
   let none=document.querySelector('.none')
   let mc=document.querySelector('.mc')
//    获取动态渲染的数据节点
   let newqm=document.querySelector('.newqm')
   let mint=document.querySelector('.mint')
   let caluli=document.querySelector('.caluli')
   let uname=document.querySelector('.uname')
outBtn.addEventListener('click',function(){
    mc.style.display='block'
})
out.addEventListener('click',function(){
    localStorage.clear();
    setTimeout(function(){
        location.href='./login.html'
    },2000)
    
})
none.addEventListener('click',function(){
    mc.style.display='none'
})
// 获取本地登录存的数据
  let user=JSON.parse(localStorage.getItem('data'));
//   ajax请求接口用户数据
  $http.get('http://139.9.177.51:8099/users/mysportsBadge',{userId:user.userId},function(res){
      if(res.status===0){
        //   用户名称头像签名获取
          uname.textContent=res.data.user.nickname;
          newqm.textContent=res.data.user.sign
          mint.textContent=res.data.sports.times;
          caluli.textContent=res.data.sports.calorie;
      }
    console.log(res);
  })
})