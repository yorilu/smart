/**
 * Created by anders on 15/4/20.
 */
require.config({
  baseUrl: 'app/',

  // alias libraries paths.  Must set 'angular'
  paths: {
    'angular': '../bower_components/angular/angular',
    'angular-ui-router': '../bower_components/angular-ui-router/release/angular-ui-router',
    'angularAMD': '../bower_components/angularAMD/angularAMD',
    'angularTouch': '../bower_components/angular-touch/angular-touch',
    'smartCourtLib': '../components/src/smartCourtLib'
   /// 'zepto': '../bower_components/zepto/zepto'
      //'ngload': 'ext/ngload',
  },

  // Add angular modules that does not support AMD out of the box, put it in a shim
  shim: {
    'angular': {
      //deps: ['zepto'],
      exports: 'angular'
    },
    'angularAMD': {
      exports: 'angularAMD'
    },
    'angularTouch': ['angular'],
    'smartCourtLib': ['angular'],
    'angular-ui-router': ['angular'],
    //zepto: {
    //  exports: '$'
    //}
  },

  // kick start application
  deps: ['app']
});
