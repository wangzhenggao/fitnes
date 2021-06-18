/**
 * 工具函数
 */


const assembly = {

   // @dateFormat  将格林威治时间时间或时间戳转换成标准时间
    // 
       dateFormat:function(date,text){
   //   内置对象
   let data=new Date(date);
   let y=data.getFullYear();
   let m=data.getMonth()+1;
   let d=data.getDate();
   let h=data.getHours();
   let min=data.getMinutes();
   let s=data.getSeconds();
   //  2016-6-7：24:45:48
   m=m<10?'0'+m:m;
   d=d<10?'0'+d:d;
   h=h<10?'0'+h:h;
   min=min<10?'0'+min:min;
   s=s<10?'0'+s:s;
   let str=`${y}-${m}-${d}`
   // document.write(str)
    text.textContent=str
   // return str;
       }
}
assembly.Tips = function (status, text) {
   let totns = document.createElement('div')
   totns.className = 'totns'
   let html = `<div class="box1">
    <div class="top">${status ? '√' : '!'}</div>
    <div class="botm">${text}</div>
</div>`
   totns.innerHTML = html;
   document.querySelector('body').appendChild(totns);
   setTimeout(function (e) {
      totns.remove();
   }, 2000)
}


// addfooter 添加底部导航栏

assembly.addFooter = function (str) {
   let footer = document.createElement('div');
   footer.className = 'footer dpflex';
   let html = 
   
   `<a href='./home.html'>
   <div class="${str==='home'?'item active':'item'}">
   <i class="iconfont iconhome icon"></i>
   <p>首页</p>
    </div></a>
   <a href='./sports.html'> <div class="${str==='sports'?'item active':'item'}">
   <i class="iconfont iconsports icon"></i>
   <p>运动</p>
    </div></a>
    <a href='./about.html'>
    <div class="${str==='about'?'item active':'item'}">
   <i class="iconfont iconmine icon"></i>
   <p>我的</p>
    </div></a>`;
    footer.innerHTML=html;
    document.querySelector('body').appendChild(footer);
}

//  挂载到window
window.assembly = assembly;