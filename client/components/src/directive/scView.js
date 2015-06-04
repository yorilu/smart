/**
 * Created by anders on 15/4/23.
 */
angular.module('smartCourtLib')
/**
 * @ngdoc directive
 * @name smartCourtLib.directive:sc-view
 * @description
 *  在ngView 基础上封装的属性。完成以下功能.
 *  1. 为ngView的controller提供生命周期方法，onEnter(),onExit()
 *  2. 保存页面切换时是当前页的状态数据如$scope.model和滚动条位置
 *  3. 无侵入的为controller.js 的 $scope添加公用方法
 *
 *  ##用法
 *  <pre>
 *      //controller.js
 *      //入口方法
 *      onEnter()
 *      //出口方法
 *      onExit()
 *      //回退
 *      $scope.back()
 *      $scope.showToast();
 *      $scope.hideToast()
 *      $scope.showAlert()
 *      $scope.hideAlert()
 *  </pre>
 */
  .directive("scView", ["$state", "$window", "$timeout", "$location", "$anchorScroll", "$log", "$rootScope",function ($state, $window, $timeout, $location, $anchorScroll, $log, $rootScope) {

    //页面缓存
    var viewCache = {
      //main:{
      //  data:{},
      //  scrollPos:{}
      //}
    };

    var scEvts = {
      showToast: 'SC_TOAST_SHOW',
      hideToast: 'SC_TOAST_HIDE',
      showAlert: 'SC_ALERT_SHOW',
      hideAlert: 'SC_ALERT_HIDE',
      showLoading:'SC_LOADING_SHOW',
      hideLoading:'SC_LOADING_HIDE'
    }


    function getCacheName($state){
      return $state.current.name + JSON.stringify($state.params);
    }

    function getCache(key) {
      return viewCache[key] || {
          model: {},
          scrollPos: [0, 0]
        };
    }

    function setCache(key,value){
      viewCache[key] = value;
    }

    function removeCache(key){
      if(viewCache[key]){
        viewCache[key] = null;
      }
    }

    /**
     * @ngdoc function
     * @name smartCourtLib.scView.onEnter
     * @methodOf smartCourtLib.directive:sc-view
     * @description
     *  每次切换到该页面时执行,为该view Controller的入口方法，可以在此执行业务逻辑代码
     * @example
     *  <pre>
     *  //controll.js
     *  $scope.onEnter = function(){
     *    //业务逻辑
     *  }
     *  </pre>
     */

    /**
     * @ngdoc function
     * @name smartCourtLib.scView.onExit
     * @methodOf smartCourtLib.directive:sc-view
     * @param {object} data 消息体
     * @description
     *  每次离开该页面时执行，为该view Controller的出口方法，可以在此执行清理工作
     * @example
     * <pre>
     * //controll.js
     *  $scope.onExit = function(){
     *    //业务逻辑
     *  }
     * </pre>
     */

    /**
     * @ngdoc function
     * @name smartCourtLib.scView.showToast
     * @methodOf smartCourtLib.directive:sc-view
     * @param {object} data 消息体
     * @description
     *  显示toast
     */

    /**
     * @ngdoc function
     * @name smartCourtLib.scView.hideToast
     * @methodOf smartCourtLib.directive:sc-view
     * @description
     *  隐藏toast
     */

    /**
     * @ngdoc function
     * @name smartCourtLib.scView.showAlert
     * @methodOf smartCourtLib.directive:sc-view
     * @param {object} data 消息体
     * @description
     *  显示Alert
     */

    /**
     * @ngdoc function
     * @name smartCourtLib.scView.hideAlert
     * @methodOf smartCourtLib.directive:sc-view
     * @description
     *  隐藏Alert
     */

    /**
     * @ngdoc function
     * @name smartCourtLib.scView.back
     * @methodOf smartCourtLib.directive:sc-view
     * @description
     *  返回上个view
     */
    //为scope绑定事件
    function bindScopeEvent(scope) {
      angular.forEach(scEvts, function (value, key) {
        if (!scope[key]) {
          scope[key] = function (data) {
            $rootScope.$broadcast(value, data);
          }
        }
      });

      //back事件
      if (!scope.back) {
        scope.back = function (path) {
          removeCache(getCacheName($state));
          scope.model = {};
          if($window.history.length >0 ){
            $window.history.back();
          }else if(path){
            $state.go(path);
          }
        }
      }

      if(!scope.setTitle){
        scope.setTitle = function(title){
          if(title){
            document.title = title;
          }
        }
      }
    };

    // compile function
    return function (scope, element, attrs) {

      //页面切换时保存,当前页面是数据
      scope.$on('$stateChangeStart', function () {
        // $log.log(scope.$id + scope.name + "$stateChangeStart");
        if ($state.current.name) {
           setCache(getCacheName($state),{
             model: scope.model,
             scrollPos: [$window.pageXOffset, $window.pageYOffset]
           });
            //viewCache[$state.current.name + JSON.stringify($state.params)] =
        }

        scope.onExit && scope.onExit();
        //显示loading
        scope.showLoading();
      });

      scope.$on('$stateChangeSuccess', function () {
        // $log.log(scope.$id + scope.name + "$stateChangeSuccess");
        // 如果指定hash
        if ($location.hash()) {
          $anchorScroll();
        } else {
          //恢复滚动条位置
          var cache = getCache(getCacheName($state));
          var prevScrollPos = [0, 0];
          if (cache.scrollPos) {
            prevScrollPos = cache.scrollPos;
          }
          $timeout(function () {
            $window.scrollTo(prevScrollPos[0], prevScrollPos[1]);
          }, 0);
        }
        //scope.hideLoading();
      });

      /**
       * 请求页面失败时，显示404y页面
       */
      $rootScope.$on('$stateChangeError',
        function(event, toState, toParams, fromState, fromParams, error){
          $rootScope.$broadcast('SC_LOADING_HIDE');
          scope.showErrorPage(null,true);
        });

      scope.$on('$viewContentLoaded', function () {
        //恢复view的数据
        //$log.log(scope.$id + scope.name + "$viewContentLoaded");

        var cache = getCache(getCacheName($state));
        scope.model = cache.model;

        //为scope绑定事件
        bindScopeEvent(scope);

        scope.hideLoading();
        scope.setTitle('智慧运动场');
        scope.onEnter && scope.onEnter();

      });


    }
  }])
