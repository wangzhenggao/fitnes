// 当前页面对应的css
require('../css/register.css');
// 登录页面的样式css引入
require('../css/login.css');
// 矢量图
require('../fonts/iconfont.css');


document.ready(function(){
    // 验证码
    let str=''
    let captcha = new CaptchaMini();
    captcha.draw(document.querySelector('#captcha'), function(res){
        str=res;
    });
    // 获取到所有的Input框
    let tel=document.querySelector('.tel')
    let Verifi=document.querySelector(".VerifiInp")
    let pwd=document.querySelector(".pwd")
    let twopwd=document.querySelector('.twopwd')
    // 获取注册按钮
    let subtn=document.querySelector('.subtn')
    let goLogin=document.querySelector('.goLogin')
// 失焦事件
    tel.addEventListener('blur',function(){
        // 手机号正则
        let regs=/^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
        if(!regs.test(tel.value)){
            assembly.Tips(0,"手机号格式错误")
        }if(tel.value==""){
            assembly.Tips(0,"手机号不能为空")
        }
    })
    Verifi.addEventListener('blur',function(){
        if(Verifi.value.toLowerCase()!=str.toLowerCase()){
            assembly.Tips(0,"验证码错误")
        }
    })
// 失焦事件
    pwd.addEventListener('blur',function(){
        // 密码正则
        let regs=/^[a-zA-Z]\w{5,17}$/
        if(!regs.test(pwd.value)){
            assembly.Tips(0,"密码错误格式")
            
        }
        if(pwd.value==""){
            assembly.Tips(0,"密码不能为空")
        }
    })
// 失焦事件
    twopwd.addEventListener('blur',function(){
        // 密码正则
        let regs=/^[a-zA-Z]\w{5,17}$/
        if(!regs.test(twopwd.value)){
            assembly.Tips(0,"密码格式错误")
        }
        if(twopwd.value!=pwd.value){
            assembly.Tips(0,"两次密码不一致")
        }
        if(twopwd.value==""){
            assembly.Tips(0,"确认密码不能为空")
        }
    })

    // 失焦事件
    subtn.addEventListener('click',function(){
     //   点击后先触发一次blur事件
     tel.focus();
     tel.blur();
 
     Verifi.focus();
     Verifi.blur();
 
     pwd.focus();
     pwd.blur();

     twopwd.focus();
     twopwd.blur();

     Verifi.focus();
     Verifi.blur();
 // 非空判断
     if(tel.value==""||Verifi.value==""||pwd.value==""||twopwd.value==""){
        assembly.Tips(0,"请填写信息")
     }
     let date={
        account:tel.value,
        password:pwd.value
       }
        // ajax请求
        $http. post('http://139.9.177.51:8099/users/add',date,function(res){
          if(res.status===1){
               assembly.Tips(0,"账号已被注册")
          }if(res.status===0){
            assembly.Tips(1,"注册成功")
            setTimeout(function(){
                location.href='./login.html'
            },2000)
             
          }
        })
    })
// 点击跳转登录
goLogin.addEventListener('click',function(){
    location.href='./login.html'
})
})

