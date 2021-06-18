require('../css/about.less');
document.ready(function(){
    assembly.addFooter('about');
   let outBtn=document.querySelector('.outBtn')
   let out=document.querySelector('.out')
   let none=document.querySelector('.none')
   let mc=document.querySelector('.mc')
   let fileBtn=document.querySelector('.file-btn')
   let hed=document.querySelector('#hed')
//    获取动态渲染的数据节点
   let newqm=document.querySelector('.newqm')
   let mint=document.querySelector('.mint')
   let caluli=document.querySelector('.caluli')
   let uname=document.querySelector('.uname')
   let imgTitle=document.querySelector('.portrait img')
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
 
  function getInfo(){
    $http.get('http://139.9.177.51:8099/users/accountinfo',{userId:user.userId},function(res){
    if(res.status===0){
        if(res.data.imgurl){
          imgTitle.src=res.data.imgurl;
        }
        if(res.data.nickname){
           uname.textContent=res.data.nickname;
        }

        if(res.data.sign){
            newqm.textContent=res.data.sign
        }
       
      }
  })
  }
  // 调用用户信息
  getInfo();
function getsports(){
  $http.get('http://139.9.177.51:8099/users/mysportsBadge',{userId:user.userId},function(res){ 
  if(res.status===0){ 
      if(res.data.sports.times){
       mint.textContent=res.data.sports.times;
     }
     if(res.data.sports.calorie){
         caluli.textContent=res.data.sports.calorie;
     }
     }
  })
}
getsports();

// 定义一个路径
let url="http://139.9.177.51:8099";
// 上传头像
imgTitle.addEventListener('click',function(e){
    fileBtn.click();
    e.stopPropagation();
})
// 封装一个上传文件的函数
function upportrait(){
  fileBtn.addEventListener('change',function(res){
    // console.log(this.files[0]);
    // 调用http封装的文件上传  【上传的是files文件流】
     $updateFile(url+'/users/upload','imgurl',this.files[0],function(res){
       if(res.status===0){
           let obj={
            userId:user.userId,
             imgurl:url+res.data
               }
             UpuserPost(obj);
       }
     })
})
}
// 调用上传文件的函数
upportrait();;

function UpuserPost(data){
   $http.post(url+'/users/userEdit',data,function(res){
        imgTitle.src=data.imgurl
   })
}

hed.addEventListener('click',function(){
  location.href='./information.html'
})
})