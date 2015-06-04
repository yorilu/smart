({ 
  appDir: 'client',   //项目根目录
  dir: 'dest/client',  //输出目录，全部文件打包后要放入的文件夹（如果没有会自动新建的）
  
  baseUrl: './',   //相对于appDir，代表要查找js文件的起始文件夹，下文所有文件路径的定义都是基于这个baseUrl的
  
  modules: [					  //要优化的模块
    	//说白了就是各页面的入口文件，相对baseUrl的路径，也是省略后缀“.js”
  ],
  
  fileExclusionRegExp: /^(r|build)\.js|.*\.scss$/,	//过滤，匹配到的文件将不会被输出到输出目录去
  
  optimizeCss: 'standard', 
  
  removeCombined: true,   //如果为true，将从输出目录中删除已合并的文件
  
  // Add angular modules that does not support AMD out of the box, put it in a shim
  shim: {
    'angular': {
      deps: ['zepto'],
      exports: 'angular'
    },
    'angularAMD': {
      exports: 'angularAMD'
    },
    'angularTouch': ['angular'],
    'smartCourtLib': ['angular'],
    'angular-ui-router': ['angular'],
    zepto: {
      exports: '$'
    }
  },
  paths: {	//相对baseUrl的路径
    'angular': 'bower_components/angular/angular',
    'angular-ui-router': 'bower_components/angular-ui-router/release/angular-ui-router',
    'angularAMD': 'bower_components/angularAMD/angularAMD',
    'angularTouch': 'bower_components/angular-touch/angular-touch',
    'smartCourtLib': 'components/src/smartCourtLib',
    'zepto': '.bower_components/zepto/zepto'
      //'ngload': 'ext/ngload',
  }
  //	 ,shim:{ .....}	  //其实JQ和avalon都不是严格AMD模式，能shim一下最好了，不过这里咱省略
})