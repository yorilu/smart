({ 
  appDir: 'client',   //��Ŀ��Ŀ¼
  dir: 'dest/client',  //���Ŀ¼��ȫ���ļ������Ҫ������ļ��У����û�л��Զ��½��ģ�
  
  baseUrl: './',   //�����appDir������Ҫ����js�ļ�����ʼ�ļ��У����������ļ�·���Ķ��嶼�ǻ������baseUrl��
  
  modules: [					  //Ҫ�Ż���ģ��
    	//˵���˾��Ǹ�ҳ�������ļ������baseUrl��·����Ҳ��ʡ�Ժ�׺��.js��
  ],
  
  fileExclusionRegExp: /^(r|build)\.js|.*\.scss$/,	//���ˣ�ƥ�䵽���ļ������ᱻ��������Ŀ¼ȥ
  
  optimizeCss: 'standard', 
  
  removeCombined: true,   //���Ϊtrue���������Ŀ¼��ɾ���Ѻϲ����ļ�
  
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
  paths: {	//���baseUrl��·��
    'angular': 'bower_components/angular/angular',
    'angular-ui-router': 'bower_components/angular-ui-router/release/angular-ui-router',
    'angularAMD': 'bower_components/angularAMD/angularAMD',
    'angularTouch': 'bower_components/angular-touch/angular-touch',
    'smartCourtLib': 'components/src/smartCourtLib',
    'zepto': '.bower_components/zepto/zepto'
      //'ngload': 'ext/ngload',
  }
  //	 ,shim:{ .....}	  //��ʵJQ��avalon�������ϸ�AMDģʽ����shimһ������ˣ�����������ʡ��
})