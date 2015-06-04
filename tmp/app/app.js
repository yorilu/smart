'use strict';
define(['angularAMD',
  'main/routes',
  'common/routes',
  'smartCourtLib'], function (angularAMD, mainRoutes, commRoutes,smartCourtLib) {

  var app = angular.module('smartCourtApp', ['ui.router','ngTouch','smartCourtLib']);

  app.config(['$stateProvider',
    '$urlRouterProvider',
    '$sceDelegateProvider',
    '$locationProvider',
    '$httpProvider',
    '$logProvider',
    'scHttpProvider',
    function ($stateProvider, $urlRouterProvider, $sceDelegateProvider, $locationProvider,
              $httpProvider,$logProvider, scHttpProvider) {

      //加载模块路由配置
      var routeSet = angular.extend({}, mainRoutes, commRoutes);
      angular.forEach(routeSet, function (routes, catalog) {
        var templateUrlPrdfix = 'app/' + catalog + '/views/',
          controllerUrlPrdfix = catalog + '/controllers/';
        angular.forEach(routes, function (route, key) {
          if (!route.templateUrl) {
            route.templateUrl = templateUrlPrdfix + key + '.html';
          }
          if (!route.controllerUrl) {
            route.controllerUrl = controllerUrlPrdfix + key + '.controller';
          }
          $stateProvider.state(key, angularAMD.route(route));
        })
      })

      //加载模块路由配置
      $urlRouterProvider.otherwise('/main');

      //设置http post的编码格式
      $httpProvider.defaults.headers.post['Content-Type'] = 'text/plain; charset=UTF-8';

      //设定服务地址
      //scHttpProvider.setBaseUrl('http://120.26.44.110:8080/smart-api/');

      var env = '',host = location.host;
      if (host == '123.57.40.63') {
        //测试环境
        env = '.test1';
      } else if (host.indexOf('172.16') > -1|| host.indexOf('localhoat')>-1) {
        //开发环境
        env = '.dev';
      }
      scHttpProvider.setBaseUrl('http://{{replace}}'+env+'.smartcourt.cn/');

      //打开日志
      $logProvider.debugEnabled(true);

      //设置资源白名单
      $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        /.*/
      ]);

      //开启html5 pushstate模式
      $locationProvider.html5Mode(true);

    }
  ]);

  return angularAMD.bootstrap(app);
});
