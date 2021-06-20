require('../css/exerciseData.less');
document.ready(function(){

   let tx=document.querySelector('.tx')
   let mnt=document.querySelector('.mnt')
   let kcal=document.querySelector('.kcal')
   let kcaldata=document.querySelector('.kcaldata')
   let daydata=document.querySelector('.daydata')
   let continuous=document.querySelector('.continuous')
//    服务器地址
   let url='http://139.9.177.51:8099'
   let user=JSON.parse(localStorage.getItem('data'))
   function getExerciseData(){
       $http.get(url+'/sports/exerciseData',{id:user.userId},function(res){
        console.log(res);
        //  分钟
        mnt.textContent=res.data.times
        // 千卡
        kcal.textContent=res.data.calorie
        // 消耗千卡
        kcaldata.textContent=res.data.calorie
        // 累加天
        // daydata.textContent=res.data
       })
   }
   getExerciseData()



})