#Smart-Court

##下载
1. 安装git
2. git clone 

##安装
1. 安装node
2. 安装node命令行工具，执行npm install -g yo bower grunt-cli
3. 命令行执行yo,看可否找到命令，如找不到 需要将node的命令行加入windows的PATH变量。
    查看node 命令行安装路径 npm config list
4. 进入项目目录执行npm install && bower install

##运行
进入项目目录，执行grunt server

##目录说明

    client  静态资源目录
      app 程序目录
        main  主模块目录
          controllers   js controller目录
          models        js model 目录
          test          js 单元测试目录
          views         view 目录
          main.js       模块路由配置
        app.js  程序启动文件
      assets  img,css目录
      bower_components  bower组件目录
      components  公用组件目录
        provider  
        service
        ui
      index.html  启动文件
    e2e   端到端测试
    server  node服务端目录
    Gruntfile.js  grunt打包脚本
    karma.conf.js 测试配置文件
