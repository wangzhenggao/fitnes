require('../css/exerciseData.less');
const { time } = require('echarts');
// 导入 数据图
const echarts=require('echarts')
document.ready(function(){
  
   let tx=document.querySelector('.tx')
   let mnt=document.querySelector('.mnt')
   let kcal=document.querySelector('.kcal')
   let kcaldata=document.querySelector('.kcaldata')
   let daydata=document.querySelector('.daydata')
   let continuous=document.querySelector('.continuous')
    let backBnt=document.querySelector('.backBtn')
//    服务器地址
   let url='http://139.9.177.51:8099'
   let user=JSON.parse(localStorage.getItem('data'))
   function getExerciseData(){
       $http.get(url+'/sports/exerciseData',{id:user.userId},function(res){
        //  分钟
        mnt.textContent=res.data.times
        // 千卡
        kcal.textContent=res.data.calorie
        // 消耗千卡
        kcaldata.textContent=res.data.calorie
        // 累加天
        // daydata.textContent=res.data
       })
   }
   getExerciseData()
  
// 模拟数据
  let data =[
     {
       days:"6-14",
       times:95
     },
     {
      days:"6-15",
      times:100
    },
    {
      days:"6-16",
      times:125
    },
    {
      days:"6-17",
      times:65 
    },
    {
      days:"6-18",
      times:90
    },
    {
      days:"6-19",
      times:110
    },
    {
      days:"6-20",
      times:75
    },
  ]

   let dataVal=[
      {
         val:300,
         name:"骑行"
      },
      {
         val:200,
         name:"跑步"
      },
      {
         val:270,
         name:"训练"
      }
   ]


//   定义一个空数组来装数据
  let days=[]
  let times=[]
   data.forEach(function(item){
     days.push(item.days)
     times.push(item.times)
   })
   let arr = dataVal.map(function (item) {
      // 返回一个对象。
      return {
          value: item.val,
          name: item.name
      };
  })
   var myChart = echarts.init(document.getElementById('main'));
   // 指定图表的配置项和数据
   var option = {
       title: {
         left: 'center',
           text: '近七天运动数据',
       },
       tooltip: {},
       
       xAxis: {
           data: days
       },
       yAxis: {},
       series: [{
           name: '运动量',
           type: 'bar',
           data: times
       }]
   };
   // 使用刚指定的配置项和数据显示图表。
   myChart.setOption(option);

   var pieChart = echarts.init(document.getElementById('pieChart'));
   // 指定图表的配置项和数据
  let pieChartData = {
      backgroundColor: 'white',
     
      title: {
          text: '运动分类',
          left: 'center',
          top: 20,
          borderRadius: 100,
          textStyle: {
              color: 'black'
          }
      },
  
      tooltip: {
          trigger: 'item'
      },
      visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
              colorLightness: [0, 1]
          }
      },
      series: [
          {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              data: arr.sort(function (a, b) { return a.value - b.value; }),
              roseType: 'radius',
              label: {
                  color: 'black'
              },
              labelLine: {
                  lineStyle: {
                      color: 'black'
                  },
                  smooth: 0.2,
                  length: 10,
                  length2: 20
              },
              itemStyle: {
                  color: '#c23531',
                  shadowBlur: 200,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
              },
  
              animationType: 'scale',
              animationEasing: 'elasticOut',
              animationDelay: function (idx) {
                  return Math.random() * 200;
              }
          }
      ]
  };
   // 使用刚指定的配置项和数据显示图表。
   pieChart.setOption(pieChartData);

   var figSituation = echarts.init(document.getElementById('figSituation'));

  let Situation = {
    title:{
       text:'运动数据',
       left: 'center',
     },
      xAxis: {
          type: 'category',
          data: days
      },
      yAxis: {
          type: 'value'
      },
      series: [{
          data: times,
          type: 'line'
      }]
  };
  figSituation.setOption(Situation);

  // 退出按钮点击事件
  backBnt.addEventListener('click',function(e){
        location.href='./about.html'
  })
})