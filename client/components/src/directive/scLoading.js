/**
 * Created by danny zou on 15/4/29.
 */

/**
 * @ngdoc directive
 * @name smartCourtLib.directive:scLoading
 * @description
 *  Loading层组件
 *
 *  ##用法
 *  <pre>
 * $scope.showLoading() //显示全局loading浮层
 * $scope.hideLoading() //隐藏全局loading浮层
 *  </pre>
 */
angular.module("smartCourtLib")
  .directive('scLoading', ['$rootScope',
    function($rootScope) {
      var _rootScope = $rootScope;

      var TEMPLATE =
//'<a href="javascript:void(0);" ng_hide="!_isshow" ng-click="loadingClick()" class="toast_page alignmiddle"><span class="loading_page"></span></a>';
  '<a href="javascript:void(0);" ng_hide="!_isshow" ng-click="loadingClick()"  class="toast_page"><span class="loading_page"></span></a>';
        // '<div class="cui-layer-padding ng-scope" ng_hide="!_isshow" ng-click="loadingClick()" style="' +
        // 'width: 220px;      ' +
        // 'line-height: 24px;    ' +
        // 'border-radius: 5px; ' +
        // 'background: rgba(0, 0, 0, .7); ' +
        // 'padding: 10px 15px;   ' +
        // 'color: #fff;      ' +
        // 'font-weight: 700;   ' +
        // 'text-align: center;  ' +
        // 'word-break: break-all;' +
        // 'z-index: 9999;' +
        // 'position: fixed;' +
        // 'top: 50%;"' +
        // '<div class="cui-layer-content">' +
        // 'Loading</div>' +
        // '</div>';

      return {
        restrict: 'E',
        template: TEMPLATE,
        replace: true,
        scope: [],
        link: function(scope, element, attrs) {
          scope._isshow = false;

          scope.$on('SC_LOADING_SHOW', function(event, args) {
            _rootScope.$broadcast('SC_MASK_SHOW');
            scope._isshow = true;
          });
          scope.$on('SC_LOADING_HIDE', function(event) {
            scope.loadingClick();
          });
          scope.$on('SC_MASK_CLICK', function(event) {
            scope._isshow = false;
          });
          scope.loadingClick = function() {
            scope._isshow = false;
            _rootScope.$broadcast('SC_MASK_HIDE');

          }
        }
      };
    }
  ]);