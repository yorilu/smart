 /**
  * Created by danny zou on 15/4/22.
  */

 /**
  * @ngdoc directive
  * @name smartCourtLib.directive:scMask
  * @description
  *  Mask遮罩层组件（在toast等组件中调用，一般不单独调用）
  *
  *  ##用法
  *  <pre>
  *  html：
  *  <sc-mask ng-show='(boolean)' call-back='(function)'></sc-mask>
  * ng-show 必传 aaa:boolean
  * call-back 选传 function
  *  </pre>
  */
 angular.module("smartCourtLib")
 	.directive('scMask', ['$rootScope', function($rootScope) {
 		var _rootScope = $rootScope;

 		//var TEMPLATE = '<div ng_show="_isshow" ng-click="maskClick()"" style="width: 100%; height: 1447px; position: absolute; left: 0px; top: 0px; z-index: 3003;position: fixed !important;background-color: rgba(0,0,0,.5);right: 0;bottom: 0;"></div>';
      var TEMPLATE ='<section class="loadall" ng_show="_isshow" ng-click="maskClick()"></section>';

 		return {
 			restrict: 'E',
 			template: TEMPLATE,
 			replace: true,
 			scope: [],
 			link: function(scope, element, attrs) {
 				scope._isshow = false;
 				scope.$on('SC_MASK_SHOW', function(event) {
 					scope._isshow = true;
 				});
 				scope.$on('SC_MASK_HIDE', function(event) {
 					if (scope._isshow) {
 						scope._isshow = false;
 					}
 				});

 				scope.maskClick = function() {
 					_rootScope.$broadcast('SC_MASK_CLICK');
 					scope._isshow = false;

 				}

 			}
 		};
 	}]);