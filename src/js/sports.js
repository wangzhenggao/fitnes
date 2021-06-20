require('../css/sports.less');
document.ready(function(){
    assembly.addFooter('sports');
    // 获取所有的Dom节点
    let courses=document.querySelector('.courses')
    let ilstDom=document.querySelector('.list')
    // 获取本地id
    let user=JSON.parse(localStorage.getItem('data'));
    let url='http://139.9.177.51:8099'
    //  ajax请求数据
    $http.get('http://139.9.177.51:8099/sports/courseList',{id:user.userId},function(res){
        console.log(res);
        // 通过Find抛出最新课程
       let newData=res.data.find(function(item){
        //    抛出满足条件的第一个元素
              return item.latest==1
       })
    //    拼接最新课程节点内容
       let newHtml=`
     <a href='./Details.html?id=${newData.courseId}'>
     <div class="imgbox">        
       <img class="imgstyle" src="${url+newData.imgurl}" alt="">
   </div>
   <div class="textbox">
       <div class="name">${newData.name}</div>
       <div class="desc">${newData.desc}</div>
   </div>
     </a>
       `
    //    给节点添加内容
      courses.innerHTML=newHtml;
    //   定义
     let listHtml=``
    //  循环遍历课程
     res.data.forEach(function(item){
        //  循环累加节点内容
        console.log(item);
        listHtml+=`
        <a href='./Details.html?id=${item.courseId}'>
        <div class="curriculumbox mt20" style="background: url('${url+item.imgurl}');">
              <div class="curriculum mt20">
                  <p>${item.name}</p>
                  <p>${item.desc}</p>
              </div>  
        </div></a>`
     });
    //  循环完成给节点添加内容
     ilstDom.innerHTML=listHtml

    })
 
})