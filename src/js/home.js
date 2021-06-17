require('../css/home.less');
document.ready(function(){

  // 获取dom节点
  let RankInfo=document.querySelector('.RankInfo')
  let punchdate=document.querySelector('.punchdate')
  let punchBtn=document.querySelector('.punchBtn')
  let badgeDate=document.querySelector('.badgeDate')
  // 调用公共页脚渲染页面
    assembly.addFooter('home');
    // 轮播图
    var mySwiper = new Swiper ('.swiper-container', {
        loop: true, // 循环模式选项
        autoplay:true,
        effect:"coverflow",
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
        }
      }) 
      
      // 获取登录存储的本地数据  [注意] 获取到的本地数据要转换成js复杂数据类型
      let user=JSON.parse(localStorage.getItem('data'));
      console.log(user.userId);
      function loginInfo(){
        $http.get('http://139.9.177.51:8099/headPageInfo',{"userId":user.userId},function(res){
          console.log(res);     
          if(res.status===0){
                  RankInfo.textContent=res.data.rank;
                  punchdate.textContent=res.data.punchIn;
                  badgeDate.innerHTML= res.data.insigniaNum;
                }
                if(res.data.isPunch==="true"){
                  punchBtn.textContent="今日已打"
                  
                }if(res.data.isPunch==="false"){
                  punchBtn.textContent="立即打卡"
                }
          });
      }
      loginInfo();
      // 点击打卡
      punchBtn.addEventListener('click',function(res){
        $http.get('http://139.9.177.51:8099/clockIn',{"userId":user.userId},function(res){
          // console.log(res);     
          if(res.status===0){
                assembly.Tips(1,'打卡成功')
                loginInfo();
                }else{
                  assembly.Tips(0,'打卡失败')
                }
          });
      })
})