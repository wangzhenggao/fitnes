require('../css/Details.less')
document.ready(function(){
    // 特殊字符串处理
   let str= location.search
  let uid=  assembly.strTo(str)
  let url='http://139.9.177.51:8099'

//  本地Id
  let user=JSON.parse(localStorage.getItem('data'))
//  获取dom节点
  let vide=document.querySelector('.vide')
  let desc=document.querySelector('.desc')
  let kaluli=document.querySelector('.kaluli')
  let mimt=document.querySelector('.mimt')
   let cousname=document.querySelector('.cousname')
   let imgtit=document.querySelector('.imgtit')
   let newname=document.querySelector('.newname')
   let freq=document.querySelector('.freq')
   let equipment=document.querySelector('.equipment')
  let data="";
  // 获取跳转节点
  let goBtn=document.querySelector('.goBtn')
  let backBtn=document.querySelector('.backBtn')
//   获取详细课程
  function getscourInfo(){
      $http.get(url+'/sports/courseDetail',{id:uid.id},function(res){
        cousname.textContent=res.data.name
                console.log(res);
                vide.src=url+res.data.imgurl;
                desc.textContent=res.data.desc
                kaluli.textContent=res.data.calorie
                mimt.textContent=res.data.time
                data=res.data.fragments;
                sessionStorage.setItem('videoList',JSON.stringify(data))
                freq.textContent=res.data.peoplenum+'次'
                equipment.textContent=res.data.instrument
      }) 
  }
//   获取用户信
console.log(user.userId);
   $http.get(url+'/users/accountinfo',{userId:user.userId},function(res){
        console.log(res);
        imgtit.src=res.data.imgurl
        newname.textContent=res.data.nickname
   })
  getscourInfo();

  // 跳转页面
 vide.addEventListener('click',function(e){
      location.href='./videoList.html'
 })
 backBtn.addEventListener('click',function(){
      location.href='./sports.html'
 })
 goBtn.addEventListener('click',function(){
     vide.click();
 })
})