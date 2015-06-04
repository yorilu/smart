'use strict';

define(['../models/list.model'],
  function() {
    return ['$scope', 'listModel', '$stateParams', 
      function($scope, models, $stateParams) {

        //入口方法
        $scope.onEnter = function() {
            $scope.showLoading();
            var cityid = $scope.model.cityId ? $scope.model.cityId : ($stateParams.cityId ? $stateParams.cityId : 2);
            var citylist = ($scope.model && $scope.model.citylist) || [];

            if (citylist.length > 0) { //城市列表已经存在
              renderTab(citylist, cityid);
              renderList(cityid);
            } else { //城市列表不存在
              var CitysPromise = models.citys.post();
              //request城市列表
              CitysPromise.then(function(json) {
                citylist = json;
                $scope.model.citylist = json;
                renderTab(citylist, cityid);
                renderList(cityid);
              }, function() {
                $scope.hideLoading();
                $scope.showErrorPage();
              })
            }
            //function：初始化tab
            function renderTab(citylistObj, curCityId) {
              var _curId = curCityId ? curCityId : 2;
              for (var i = citylistObj.length - 1; i >= 0; i--) {
                if (citylistObj[i].id == _curId) {
                  citylistObj[i].selected = true;
                  break;
                }
              };
              $scope.dataModel = {
                data: citylistObj,
                selectHandler: function(data, index) {
                  $scope.showLoading();
                  window.scrollTo(0,0);
                  renderList(data.id);
                  $scope.model.cityId = data.id;

                }
              };

            }

            //function：请求场馆列表，update data
            function renderList(cityid) {
              var StadiumListPromise = models.stadiumLists.post({
                cityId: cityid,
                pageSize:100,
                pageIndex:1,
                businessType:'直播',
                isReady:'Y'
              });
              StadiumListPromise.then(function(json) {
                $scope.hideLoading();
                $scope.json = json;
              }, function() {
                $scope.hideLoading();
                $scope.showErrorPage();
              })

            }

          }

          // scrollService.onBottomPull = function() {
          // 	setTimeout(function() {
          // 		for (var i = 0; i < 6; i++) {
          // 			var a = {
          // 				"id": i,
          // 				"name": "V5篮球馆",
          // 				"address": "上梅林中康北路尾通大汽车广场内(近上梅林地铁站)",
          // 				"images": "http://123.56.102.183:3000/images/szv51.jpg",
          // 			};
          // 			$scope.json.push(a)
          // 		}
          // 		$scope.$apply();
          // 		scrollService.endPull();
          // 	}, 2000);
          // };
          // $scope.$on('$viewContentLoaded', function(event) {
          //   console.log(5);
          // });
          // $scope.$on('$stateChangeStart', function(evt, next, current) {
          // 	scrollService.removeScrollListener();
          // });

      }
    ]
  });