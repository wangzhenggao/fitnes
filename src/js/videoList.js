require('../css/videoList.less');


document.ready(function(){

    // 服务器地址
    let url='http://139.9.177.51:8099'
    // 获取本地视频列表
    let videoList=JSON.parse(sessionStorage.getItem('videoList'))
    // 获取所有的Dom动态节点
    let newindex=document.querySelector('.newindex')
    let vid=document.querySelector('.vid')
    let title=document.querySelector('.title')
    let alllength=document.querySelector('.alllength')
    let Mantle=document.querySelector('.Mantle')
    let dynaPic=document.querySelector('.dynaPic')
    let dynaTitl=document.querySelector('.dynaTitl')
    // 获取控制台按钮
    let go=document.querySelector('#go')
    let stop=document.querySelector('#stop')
    let back=document.querySelector('#back')
    let progress=document.querySelector('.progress')
    // 退出继续按钮
    let endPlayback=document.querySelector('.endPlayback')
    let keepPlaying=document.querySelector('.keepPlaying')
    console.log(videoList);
   
    // 定义一个索引
    let index=0;
   
    // 播放
    function videoPlay(index){
        newindex.textContent=index+1;
        alllength.textContent=videoList.length
        title.textContent=videoList[index].title
        vid.src=url+videoList[index].videoUrl;
        dynaPic.src=url+videoList[index].imgUrl;
    }
    videoPlay(index);
    // 下一集按钮
    go.addEventListener('click',function(){
        if(index<videoList.length-1){
            index++
            console.log(index);
            videoPlay(index);

        }
    })
    // 上一集按钮
    back.addEventListener('click',function(){
        if(index!=0){
            index--
            videoPlay(index);
        }
    })
    // 自动播放
    vid.addEventListener('ended',function(e){
        // 判断是否最后一个视频,是最后一个视频则结束事件
        if (index==videoList.length-1) {
            return ;
        }
           index++
           videoPlay(index);
    })

    // 暂停播放
    stop.addEventListener('click',function(){
        vid.pause();
        Mantle.style.display='block'
        dynaTitl.textContent=title.textContent;
    })
    // 进度条
    setInterval(function(){
     
        // 当前视频进度÷上视频总长度获得进度条长度
        let videoLength=(vid.currentTime/vid.duration) *100
        // 给进度条长度
        videoLength=videoLength.toFixed(0)+'%'
        progress.style.width=videoLength
    },60)
    // 蒙层页面渲染
    dynaTitl.textContent=title.textContent
    // 继续训练
    keepPlaying.addEventListener('click',function(){
        Mantle.style.display='none'
        vid.play();
    })
    // 结束
    endPlayback.addEventListener('click',function(){
        history.back();
    })
})