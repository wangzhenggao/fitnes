/**
 * 工具函数
 */


 const   assembly={

 }
 assembly.Tips=function(status,text){
    let totns=document.createElement('div')
    totns.className='totns'
    let html=`<div class="box1">
    <div class="top">${status?'√':'!'}</div>
    <div class="botm">${text}</div>
</div>`
totns.innerHTML=html;
document.querySelector('body').appendChild(totns);
setTimeout(function(e){
   totns.remove();
},2000)
}
//  挂载到window
 window.assembly=assembly;