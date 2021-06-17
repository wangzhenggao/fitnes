require('../css/sports.less');
document.ready(function(){
    assembly.addFooter('sports');
    // 获取所有的Dom节点
    let imgstyle=document.querySelector('.imgstyle')
    let name=document.querySelector('.name')
    let desc=document.querySelector('.desc')
    // 获取本地id
    let user=JSON.parse(localStorage.getItem('data'));
  
   function sj(callback){
    $http.get('http://139.9.177.51:8099/sports/allcourse',{id:user.userId},function(res){
         callback(res.data)
    })
   } 
    // 回调
    sj(function(arr){
     console.log(arr);
    })
})