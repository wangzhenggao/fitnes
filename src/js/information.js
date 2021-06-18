require('../css/information.less');
document.ready(function(){
    
    // 获取所有的DOM
    let sex=document.querySelector("#sex")
    let sextext=document.querySelector("#sextext")
    let birthday=document.querySelector("#birthday")
    let birthdayText=document.querySelector("#birthdayText")
    let city=document.querySelector('#city')
    let province=document.querySelector('#province')
    let provinceText=document.querySelector('#provinceText')
    let cityText=document.querySelector('#cityText')
    let head=document.querySelector('.head')
    let newNickName=document.querySelector('.new-nickname')
    let textareaval=document.querySelector('.textareaval')

    let user=JSON.parse(localStorage.getItem('data'))
    // 获取提交按钮
    let saveBtn=document.querySelector('.Save-data')
// 跳转页面
    head.addEventListener('click',function(e){
      location.href='./about.html'
    })
    // 定义最后保存的全局变量
    let data={
        nickname:'',
        gender:'',
        birthday:'',
        address:'',
        sign:'',
        city:'',
        userId:user.userId
      }

    //   昵称上传
    newNickName.addEventListener('change',function(e){
        data.nickname=this.value
    })
// 个人简介
textareaval.addEventListener('change',function(){
    data.sign=this.value
    console.log(data);
})
// 性别选择
   sex.addEventListener('click',function(){
    weui.picker([{
        label: '男',
        value: 0
    }, {
        label: '女',
        value: 1
    }, {
        label: '保密',
        value: 2
    },{
        label: '嬲',
        value: 3
    }, {
        label: '其他',
        value: 4
    }], {
        onConfirm: function (result) {
            // console.log(result);
            sextext.textContent=result[0].label
            data.gender=result[0].label;
        },
        title: '选择性别'
    });
   })
//  生日选择
  birthday.addEventListener('click',function(){
    weui.datePicker({
        start: 1950,
        end: new Date().getFullYear(),
        onConfirm: function (result) {
            birthdayText.textContent=result[0].value+'-'+result[1].value+'-'+result[2].value
            data.birthday=birthdayText.textContent
        },
        title: '选择生日'
    });
  })



  
//  选择省份
province.addEventListener('click',function(){
    data.city="";
    cityText.textContent="请选择"
    $http.get("http://139.9.177.51:8099/address/province",data,function(res){
        let arr=res.data.map(function(item){
            return {
                label:item.name,
                value:item.addressId
            };
        })
        weui.picker(arr, {
            onConfirm: function (result) {
                // console.log(result);
                provinceText.textContent=result[0].label
                data.address=result[0];
            },
            title: '选择省份'
        });
    })
})
// 选择区市

city.addEventListener('click',function(){
    if(data.address==""){
        assembly.Tips(0,"请选择省份")
    }else{
        $http.get('http://139.9.177.51:8099/address/city/'+data.address.value,function(res){
            let arr=res.data.map(function(item){
                return {
                    label:item.name,
                    value:item.addressId
                };
            })
            weui.picker(arr, {
                onConfirm: function (result) {
                    // console.log(result);
                    cityText.textContent=result[0].label
                    data.city=result[0];
                },
                title: '选择区县'
            });
        })
    }
})


saveBtn.addEventListener('click',function(){
   data.address=[data.address.label,data.city.label];
   data.birthday=new Date(data.birthday)
    $http.post('http://139.9.177.51:8099/users/userEdit',data,function(res){
     console.log(res);
    })
})
console.log(user.userId);
// 渲染
$http.get('http://139.9.177.51:8099/users/accountinfo',{userId:user.userId},function(res){

//    console.log(res);
    sextext.textContent=res.data.gender;
   assembly.dateFormat(res.data.birthday,birthdayText)
    res.data.address=res.data.address.split(',')
    console.log(res.data.address);
    provinceText.textContent=res.data.address[0]
    cityText.textContent=res.data.address[1]
    textareaval.value=res.data.sign
    newNickName.value=res.data.nickname
})


})