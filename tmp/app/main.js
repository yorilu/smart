/**
 * Created by anders on 15/4/20.
 */
require.config({
  baseUrl: 'app/',

  // alias libraries paths.  Must set 'angular'
  paths: {
    'libs':'../bower_components/libs',
    'angularAMD': '../bower_components/angularAMD/angularAMD',
    'smartCourtLib': '../components/smartCourtLib',
    'scVideoPlayer': '../components/videoplayer/mediaelement-and-player'
    //'ngload': 'ext/ngload',
  },

  // Add angular modules that does not support AMD out of the box, put it in a shim
  shim: {
    'libs':{
      exports: 'libs'
    },
    'smartCourtLib':{
      export: 'smartCourtLib'
    },
    'angularAMD': {
      exports: 'angularAMD',
      deps:['smartCourtLib','scVideoPlayer']
    }

  },

  // kick start application
  deps: ['app']
});
