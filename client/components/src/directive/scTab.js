/**
 * Created by danny zou on 15/4/16.
 */

/**
 * @ngdoc directive
 * @name smartCourtLib.directive:scTab
 * @description
 *  tab标签组件
 *
 *  ##用法
 *  <pre>
 *  html：
 *  <sc-tab tab-model="dataModel" ></sc-tab>
 *  </pre>
 *  <pre>
 *  javascript：
 * $scope.dataModel = {
 * 			data: [{   //必选，tab的数据
 * 				id: 1,
 * 				name: '北京',
 * 			}, {
 * 				id: 2,
 * 				name: '上海',
 *				selected:true//可选，是否默认选中
 * 			}],
 * 			//可选，选中callback
 * 			selectHandler : function(data,index) {
 * 				//data：当前选中项的object
 * 				//index：当前tab的索引
 * 				console.log(data);
 * 			}
 * 		};
 *  </pre>
 */
angular.module("smartCourtLib")
	.directive('scTab', function() {
		var TEMPLATE =
			'<nav>\n' +
			'<div class="pd24">\n' +
			'<ul class="areall clfix">\n' +
			'<li ng-repeat="d in tabModel.data" ng-class="{\'nowarea\':d.selected}" class="areother" data-index="{{$index}}"  ng-click="select($event)">{{d.name}}</li>\n' +
			'</ul>\n' +
			'</div>\n' +
			'</nav>';
		return {
			restrict: 'E',
			scope: {
				tabModel: '=',
				selectHandler: '&'
			},
			template: TEMPLATE,
			replace: true,
			link: function(scope, element, attrs) {
				scope.select = function(e) {
					var i = $(e.currentTarget).attr('data-index');
					var _data = scope.tabModel.data;
					//如果点击当前选中的，则不触发
					if (_data[i] && _data[i].selected) {
						return;
					}
					angular.forEach(_data, function(pane) {
						pane.selected = false;
					});
					_data[i].selected = true;
					scope.tabModel.selectHandler(_data[i], i);
				}

				if (!scope.tabModel || !scope.tabModel.data || scope.tabModel.data.length == 0) {
					return;
				}
			}
		};
	});