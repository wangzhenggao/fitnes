/*
*webpack配置文件
*作者：汪正高  2021/6/12
*/

const path = require('path');
console.log(path.resolve());
const HtmlWebpackPlugin = require('html-webpack-plugin');

//引入 提取js中的css代码的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//将css文件及代码进行极致压缩s
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

//自动清除dist 
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { homedir } = require('os');
module.exports = {
  //  入口
  entry:{
    // 公共可复用js css文件引入
    dom:'./src/js/common/dom.js',
    http:'./src/js/common/http.js',
    utils:'./src/js/common/utils.js',
    commonCSS:'./src/js/commonCSS.js',
    // 三方插件
    captacha:'./src/lib/chptcha/captcha-mini.js',
    swiper:'./src/lib/swiper/swiper-bundle.js',
    weui:'./src/lib/weui/weui.js',
    

    // 页面打包对应的js
     index:'./src/js/index.js',
     login:'./src/js/login.js',
     register:'./src/js/register.js',
     home:'./src/js/home.js',
     sports:'./src/js/sports.js',
     about:'./src/js/about.js',
     information:'./src/js/information.js',
     Details:'./src/js/Details.js',
     videoList:'./src/js/videoList.js',
     exerciseData:'./src/js/exerciseData.js'
  },
  //  出口
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
    publicPath: './'
  },
  //  loader解释器
  module: {
    rules: [
      // style-loader 将打包完成的css代码。添加到页面的head style标签中
      // css-loader 让webpack可以识别打包css代码
      {
        test: /\.css$/, use: [{
          loader: MiniCssExtractPlugin.loader,
        //  css目录修改 不修改查找css中的img会路径报错
          options: {
            publicPath: '../'
          }
        }, 'css-loader']
      },
      {
        test: /\.less$/, use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../'
          }
        }, 'css-loader', 'less-loader']
      },

      // 图片打包
      {
        //   正则
        test: /\.(jpg|png|gif)$/,
        //   loader配置  单个属性loarder  多个用use:
        loader: 'url-loader',
        //  详细配置
        options: {
          // hash随机16位字符   txt 文件后缀
          name: '[hash:16].[ext]',
          // 小于20kd则压缩 大于不压缩
          limit: 20 * 1024,
          esModule: false,
          outputPath: 'img'
        }
      },
      {
        test: /\.html$/,    //配置html文件打包
        loader: 'html-loader'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/, //配置iconfont文件打包
        loader: 'file-loader',
        options: {
          outputPath: 'fonts'   //输出的目录
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',    // loader 编译es6为es5
        exclude: /node_modules/  // 排除
      }

    ]
  },
  //   plugins插件
  plugins: [
    new HtmlWebpackPlugin({   //配置html打包的插件
      template: './src/page/index.html',//以哪个html文件作为打包的模板
      filename:'index.html',
      chunks:['index','commonCSS','dom']
    }),      
    // 登录页配置
    new HtmlWebpackPlugin({   //配置html打包的插件
        template: './src/page/login.html',//以哪个html文件作为打包的模板
        filename:'login.html',
        chunks:['login','commonCSS','dom','http',"utils"]
      }),  
// 注册页配置
      new HtmlWebpackPlugin({   //配置html打包的插件
        template: './src/page/register.html',//以哪个html文件作为打包的模板
        filename:'register.html',
        chunks:['register','commonCSS','dom','http','captacha','utils']
      }),  
      
      // 首页
      new HtmlWebpackPlugin({   //配置html打包的插件
        template: './src/page/home.html',//以哪个html文件作为打包的模板
        filename:'home.html',
        chunks:['home','commonCSS','dom','http','swiper','utils']
      }),  

      // 运动页面
      new HtmlWebpackPlugin({   //配置html打包的插件
        template: './src/page/sports.html',//以哪个html文件作为打包的模板
        filename:'sports.html',
        chunks:['sports','commonCSS','dom','http','utils']
      }),  

      // 用户信息页面
      new HtmlWebpackPlugin({   //配置html打包的插件
        template: './src/page/about.html',//以哪个html文件作为打包的模板
        filename:'about.html',
        chunks:['about','commonCSS','dom','http','utils']
      }),  

      // 个人信息页面
      new HtmlWebpackPlugin({   //配置html打包的插件
        template: './src/page/information.html',//以哪个html文件作为打包的模板
        filename:'information.html',
        chunks:['information','commonCSS','dom','http','weui',"utils"]
      }),  
       // 课程详情页面
       new HtmlWebpackPlugin({   //配置html打包的插件
        template: './src/page/Details.html',//以哪个html文件作为打包的模板
        filename:'Details.html',
        chunks:['Details','commonCSS','dom','http',"utils"]
      }),  

      new HtmlWebpackPlugin({   //配置html打包的插件
        template: './src/page/videoList.html',//以哪个html文件作为打包的模板
        filename:'videoList.html',
        chunks:['videoList','commonCSS','dom','http',"utils"]
      }),  
      
      new HtmlWebpackPlugin({   //配置html打包的插件
        template: './src/page/exerciseData.html',//以哪个html文件作为打包的模板
        filename:'exerciseData.html',
        chunks:['exerciseData','commonCSS','dom','http',"utils"]
      }), 

// 打包css文件夹
    new MiniCssExtractPlugin({
      filename: 'css/[name].css' // 输出到css文件夹里
    }),
    // 插件使用
    new OptimizeCssAssetsWebpackPlugin(),
    new CleanWebpackPlugin()
  ],
  // mode 环境
  // development 本地开发环境
  // production 线上生成环境
  mode: process.env.NODE_ENV,

  devServer: {
    contentBase: path.resolve(__dirname, 'dist'), // 启动服务器目录
    compress: true, // 启动gzip
    port: 666,  // 端口  8080 80  8081 8082
    open: true, // 自动打开服务
    publicPath: '/', // 静态资源查找路径
    openPage: 'index.html', // 打开的页面
  },
  target: 'web', // 目标是浏览器

}