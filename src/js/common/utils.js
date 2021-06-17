/**
 * 工具函数
 */


const assembly = {

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