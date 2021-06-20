require('../css/information.less');
document.ready(function () {

    // 获取所有的DOM
    let sex = document.querySelector("#sex")
    let sextext = document.querySelector("#sextext")
    let birthday = document.querySelector("#birthday")
    let birthdayText = document.querySelector("#birthdayText")
    let city = document.querySelector('#city')
    let province = document.querySelector('#province')
    let provinceText = document.querySelector('#provinceText')
    let cityText = document.querySelector('#cityText')
    let head = document.querySelector('.head')
    let newNickName = document.querySelector('.new-nickname')
    let textareaval = document.querySelector('.textareaval')

    let user = JSON.parse(localStorage.getItem('data'))
    // 获取提交按钮
    let saveBtn = document.querySelector('.Save-data')
    // 跳转页面
    head.addEventListener('click', function (e) {
        location.href = './about.html'
    })
    // 定义最后保存的全局变量
    let data = {
        nickname: '',
        gender: '',
        birthday: '',
        address: '',
        sign: '',
        city: '',
        userId: user.userId
    }
    //  调用渲染页面的接口
    getNewInfo();
    //   昵称上传
    newNickName.addEventListener('change', function (e) {
        data.nickname = this.value
    })
    // 个人简介
    textareaval.addEventListener('change', function () {
        data.sign = this.value
        console.log(data);
    })
    // 性别选择
    sex.addEventListener('click', function () {
        weui.picker([{
            label: '男',
            value: 0
        }, {
            label: '女',
            value: 1
        }, {
            label: '保密',
            value: 2
        }, {
            label: '嬲',
            value: 3
        }, {
            label: '其他',
            value: 4
        }], {
            onConfirm: function (result) {
                // console.log(result);
                sextext.textContent = result[0].label
                data.gender = result[0].label;
            },
            title: '选择性别'
        });
    })
    //  生日选择
    birthday.addEventListener('click', function () {
        weui.datePicker({
            start: 1950,
            end: new Date().getFullYear(),
            onConfirm: function (result) {
                birthdayText.textContent = result[0].value + '-' + result[1].value + '-' + result[2].value
                data.birthday = birthdayText.textContent
            },
            title: '选择生日'
        });
    })


    //  选择省份
    province.addEventListener('click', function () {
        // 再次选择的时候清空区市数据
        data.city = "";
        // 再次选择的时候清空区市页面文本
        cityText.textContent = "请选择"
        $http.get("http://139.9.177.51:8099/address/province", data, function (res) {
            // 取到的所有数据通过map生成一个新的数组
            let arr = res.data.map(function (item) {
                // 返回一个对象。
                return {
                    label: item.name,
                    value: item.addressId
                };
            })
            weui.picker(arr, {
                onConfirm: function (result) {
                    provinceText.textContent = result[0].label
                    data.address = result[0];
                },
                title: '选择省份'
            });
        })
    })
    // 选择区市

    city.addEventListener('click', function () {
        // 判断必须先选择省份
        if (data.address == "") {
            assembly.Tips(0, "请选择省份")
        } else {
            $http.get('http://139.9.177.51:8099/address/city/' + data.address.value, function (res) {
                // 取到的所有数据通过map生成一个新的数组
                let arr = res.data.map(function (item) {
                    // 返回一个对象。
                    return {
                        label: item.name,
                        value: item.addressId
                    };
                })
                // 渲染框架样式
                weui.picker(arr, {
                    onConfirm: function (result) {
                        cityText.textContent = result[0].label
                        data.city = result[0];
                    },
                    title: '选择区县'
                });
            })
        }
    })

    // 提交信息
    saveBtn.addEventListener('click', function () {
        // 将省份市区拼接成数组
        data.address = [data.address.label, data.city.label];
        //    删除市区键名
        // delete data.city;
        //  转换成格林威治时间
        data.birthday = new Date(data.birthday)
        console.log(data);
        $http.post('http://139.9.177.51:8099/users/userEdit', data, function (res) {
            console.log(res);
        })
    })
    // 渲染页面
    function getNewInfo() {
        $http.get('http://139.9.177.51:8099/users/accountinfo', { userId: user.userId }, function (res) {
            if (res.data.gender) {
                sextext.textContent = res.data.gender;
                data.gender = res.data.gender;
            }
            if (res.data.birthday) {
                // 调用封装的dataFormat将格林威治时间转换为标准时间
                assembly.dateFormat(res.data.birthday, birthdayText)
                data.birthday = res.data.birthday;
            }
            // console.log(res.data.address);
            if (res.data.address) {
                //split将字符串转换成数组  ','分隔符
                res.data.address = res.data.address.split(',')
                // 渲染省份
                provinceText.textContent = res.data.address[0]
                data.address = res.data.address[0]
                // 渲染市
                cityText.textContent = res.data.address[1]
                data.city = res.data.address[1]
            }
            if (res.data.sign) {
                // 个人简介渲染
                textareaval.value = res.data.sign
                data.sign = res.data.sign;
            }
            // 昵称渲染
            newNickName.value = res.data.nickname
        })

    }
    console.log(data);

})