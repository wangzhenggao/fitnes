// 当前页面对应的css
require('../css/login.css');
// 矢量图标引入
require('../fonts/iconfont.css');
document.ready(function(){
    // 获取到Inpu框
    let userInp=document.querySelector(".username")
    let pwdInp=document.querySelector('.userpwd')
    // 获取登录按钮
     let loginBtn=document.querySelector('.loginBtn')
     let zcbtn=document.querySelector('.zcbtn')
// 点击事件
     loginBtn.addEventListener('click',function(e){
         let data={
            account:userInp.value,
            password:pwdInp.value
         }
        //  提示
        let regs=/^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
        if(!regs.test(userInp.value)){
            assembly.Tips(0,"账号格式错误")
        }if(userInp.value==""){
            assembly.Tips(0,"账号不能为空")
        }

        let regs1=/^[a-zA-Z]\w{5,17}$/
        if(!regs1.test(pwdInp.value)){
            assembly.Tips(0,"密码错误格式")
            
        }
        if(pwdInp.value==""){
            assembly.Tips(0,"密码不能为空")
        }
        //  ajax请求
        $http.post('http://139.9.177.51:8099/users/login',data,function(res){
        // 请求成功
        if(res.status===0){
                localStorage.setItem('data',JSON.stringify(res.data.user))
                location.href='./home.html'
            }else{
                assembly.Tips(0,"密码或账户名错误")
            }
        })
     })

    //  跳转注册界面
    zcbtn.addEventListener('click',function(){
        location.href='./register.html'
    })
})