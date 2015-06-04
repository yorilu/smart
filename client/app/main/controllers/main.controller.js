'use strict';
define(['../models/main.model'], function () {
  return ['$scope', 'mainModel', 'scGeo', '$log', 'scUtil', '$document', '$timeout',
    function ($scope, models, scGeo, $log, scUtil, $document, $timeout) {


      var player = new MediaElementPlayer("#j_main_video",{
        features: ['playpause','progress','current','fullscreen','titlebar']
      });

      $scope.maskShow = false;

      //入口方法
      $scope.onEnter = function () {

        $scope.showLoading();
        //下载的广告只有在ios和安卓中显示
        $scope.showAd = scUtil.os.isIOS || scUtil.os.isAndroid;

        $scope.downloadUrl = scUtil.downloadApp();

        // 从缓存中获取定位信息。
        var currentPos = $scope.model.geoPosition;
        //如果没有位置信息，发起定位
        if (!currentPos) {
          var geoPromise = scGeo.getCurrentPosition();
          geoPromise.then(function (data) {
            //内存中保存位置信息
            getNearByStaduims(data);
          }, function () {
            //定位失败处理
            getNearByStaduims();
          })
        } else {
          //如果有定位数据,发起发起附近场馆查询
          //setCurrentPos(0, 0)
          getNearByStaduims(currentPos);
        }
      }

      //入口方法
      $scope.onExit = function () {
        $log.log('onExit------');
      }

      $scope.playVideo = function (videoId) {
        //$log.log('playVideo------');
        var self = this;
        var video = $scope.video = findVideoById(videoId);
        if (video) {
          player.setSrc(video.path);
          player.setPoster(video.snapshot);
          player.setTitle(video.title);
          player.play();
          player.enterFullScreen();
        }
      };


      function findVideoById(videoId) {
        var result = null;
        angular.forEach($scope.model.topVideos, function (value, key) {
          if (value.id == videoId) {
            result = value;
            return value;
          }
        })
        return result;
      }

      //获得附近的场馆
      function getNearByStaduims(data) {
        if (data && data.latitude) {
          setCurrentPos(data.longitude || data.longtitude, data.latitude)
        } else {
          setCurrentPos(0, 0);
        }

        var nearStaduimsPromise = models.nearByStadiums.post($scope.model.geoPosition);
        //查询附近场馆
        return nearStaduimsPromise.then(function (data) {
          // 成功处理
          if (data.length > 0) {
            $scope.model.cityId = data[0].cityId;
          }
          $scope.model.nearByStadiums = data;
          //根据城市查询最近的热门视频
          getTopNVedios();
        }, function (data) {
          $scope.model.cityId = '1';
          getTopNVedios();
        })
      };

      //获得TopN的视频
      function getTopNVedios() {
        var topVideosPromise = models.topNVideo.post({
          cityId: '' + $scope.model.cityId,
          clientId: '0'
        });

        topVideosPromise.then(function (data) {
          //var result = splitArray(data, 2);
          $scope.hideLoading();
          $scope.model.topVideos = data;
        }, function () {
          $scope.hideLoading();
          $scope.showErrorPage();
        }, function () {

        })
      }

      //保存定位的信息
      function setCurrentPos(longitude, latitude) {
        //longtitude 服务端命名错误，将就他们
        $scope.model.geoPosition = {
          longitude: longitude,
          latitude: latitude
        }
      }
    }
  ]
})
;
