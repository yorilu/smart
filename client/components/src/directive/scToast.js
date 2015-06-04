/**
 * Created by danny zou on 15/4/22.
 */

/**
 * @ngdoc directive
 * @name smartCourtLib.directive:scToast
 * @description
 *  Toast层组件
 *
 *  ##用法
 *  <pre>
 * $scope.showToast({
 *            content: 'aaaaaa',  //toast的内容
 *            timeout: 2000,      //选传（默认2000ms），toast自动关闭的时间
 *            callback: function() { //选传  toast关闭时触发的callback
 *              alert(111)
 *            }
 *          });
 *  </pre>
 */
angular.module("smartCourtLib")
	.directive('scToast', ['$rootScope',
		function($rootScope) {
			var _rootScope = $rootScope;

			var TEMPLATE =
				'<a href="javascript:void(0);" class="toast_page" ng_hide="!_isshow" ng-click="toastClick()"><span class="succbtn">{{_toastModel.content}}</span></a>';
				// '<div class="cui-layer-padding ng-scope" ng_hide="!_isshow" ng-click="toastClick()" style="' +
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
				// '{{_toastModel.content}}</div>' +
				// '</div>';

			function init(args) {
				var __toastModel = {
					content: 'text',
					timeout: 2000,
					callback: angular.noop
				};

				for (var key in args) {
					switch (key) {
						case "content":
						case "timeout":
							__toastModel[key] = args[key];
							break;
						case "callback":
							__toastModel[key] = typeof(args[key]) == 'function' ? args[key] : angular.noop;
							break;
					}
				}
				return __toastModel
			}
			return {
				restrict: 'E',
				template: TEMPLATE,
				replace: true,
				scope: [],
				link: function(scope, element, attrs) {
					scope._timeout = null;
					scope._isshow = false;

					scope.$on('SC_TOAST_SHOW', function(event, args) {

						scope._toastModel = init(args);

						_rootScope.$broadcast('SC_MASK_SHOW');
						scope._isshow = true;
						clearTimeout(scope._timeout);
						scope._timeout = setTimeout(function() {
							scope.toastClick();
							scope.$apply();
						}, scope._toastModel.timeout);
					});
					scope.$on('SC_TOAST_HIDE', function(event) {
						scope.toastClick();
					});
					scope.$on('SC_MASK_CLICK', function(event) {
						if (scope._timeout)
							clearTimeout(scope._timeout);
						if (scope._isshow) {
							scope._isshow = false;
							scope._toastModel && scope._toastModel.callback && scope._toastModel.callback();
						}


					});
					scope.toastClick = function() {
						if (scope._timeout)
							clearTimeout(scope._timeout);
						scope._isshow = false;
						_rootScope.$broadcast('SC_MASK_HIDE');
						scope._toastModel && scope._toastModel.callback && scope._toastModel.callback();

					}
				}
			};
		}
	]);
