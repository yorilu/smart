/**
 * @ngdoc controller
 * @name detail.controller
 * @description detail controller
 * @param
 * */
'use strict';

define(['../models/detail.model'], function () {
  return ['$scope', '$stateParams', '$window', 'detailModel', 'scUtil',
    function ($scope, $stateParams, $window, detailModel, scUtil) {
      /**
       * @ngdoc function
       * @name palyVideo
       * @methodOf detail.controller
       * @description
       *  播放视频
       */
       /**
       * @ngdoc function
       * @name showCourtList
       * @methodOf detail.controller
       * @description
       *  显示timeline 列表
       */
       /**
       * @ngdoc function
       * @name filterSport
       * @methodOf detail.controller
       * @description
       *  过滤运动类型
       */
       /**
       * @ngdoc function
       * @name filterCourt
       * @methodOf detail.controller
       * @description
       *  过滤场地类型
       */

      var courtList = {};
      var topInited = false;
      var STRING = {
        CANT_PLAY: "无法播放该视频"
      }

      var player = new MediaElementPlayer("#J_DetailVideo",{
        features: ['playpause','progress','current','fullscreen','titlebar'],
        exitFullScreenFun:function(){
          //player.stop();
        }
      });
      /*
      $scope.name = 'detail';
      $scope.message = 'Hello';
      $scope.minDate = '2013-10-06';
      $scope.maxDate = '2015-10-06';
      $scope.disabledDates = ['2013-11-10', '2013-11-15', '2013-11-19'];
      $scope.onDateSelected = function (date) {
        console.log(date);
      };
      */

      $scope.showMainVideo = true;

      var timeLine = (function () {
        var list = [];
        var chche = {};
        return {
          push : function (item) {
            if(chche[item.date]){
              delete item.date;
              item.isFirst =false;
            }else{
              chche[item.date] = true;
              item.isFirst =true;
            }
            list.push(item);
          },
          insert : function (item) {
            list.splice(0, 0, item);
          },
          get : function () {
            return list;
          },
          clean: function (){
            list.length = 0;
            chche={};
          }
        }
      })();

      var mainVideoUrl;
      var mainVideoTitle;
      var initTop = function (data) {
        if (!topInited) {
          topInited = true;
          $scope.mainLiveUrl = mainVideoUrl =  scUtil.rtmp2m3u8(mainVideoUrl);
          $scope.mainSnapshot = data.images;
          mainVideoTitle = data.name;
        }
      };

      var videoList = {};
      var currentParam ;
      var showLoading = false;
      function playVideo(param){
        param = param || currentParam;
        currentParam = param;

        if(videoList[param.url] === false){
         // alert(param.url)
          $scope.showToast({
            content: STRING.CANT_PLAY,
            timeout: 2000
          });
          return;
        }

        //org_title:用来退出视频全屏时还原原来的title，调用在scUtil中
        document.org_title=document.title;
        $scope.setTitle(param.title);

        //使用MediaElement 播放
        player.setTitle(param.title);
        player.setSrc(param.url);
        player.play();
        player.enterFullScreen()
      }

      $scope.onEnter = function (){
        showCourtList(function (){
          requestTimeLine({
            stadiumId: stadiumId,
            newRequest: true
          });
        });

        var $video = $(".J_MainVideo");
        $video.on("error canplay", function (e){
          var type = e.type;
          var src = $video.attr("src");

          if(type == "error"){
            if(typeof videoList[src] == 'undefined'){
              videoList[src] =false;
            }
            $scope.playing = false;
          }else if(type == "canplay"){
            videoList[src] = true;
          }
        });
      }

      $scope.palyMainVideo = function (e){
        var $target = $(e.target);
        if($target.hasClass("dwnapp")){
          window.location.href=scUtil.downloadApp();
          return;
        }
        if($target.hasClass("J_MainVideo")){
          return;
        }

        playVideo({
          url:mainVideoUrl,
          title: mainVideoTitle
        })
      }

      $scope.palyVideo = function (event) {
        var url = $(event.target).attr("data-path");
        var title = $(event.target).attr("data-title");
        playVideo({
          url:url,
          title: title
        })
      };

      $scope.toggleVideo = function (){
        $scope.showMainVideo = !$scope.showMainVideo;
      }

      var showCourtList = function (cb) {
        var getCourtList = detailModel.getCourtList.post({
            stadiumId : stadiumId
          });
        getCourtList.then(function (data) {
          var sportType = data.stadium.businessList ? data.stadium.businessList[0].sportTypes:'';
          var currentIndex = "";
          for (var i = 0; i < data.courtList.length; i++) {
            var item = data.courtList[i];

            for(var j =0;j<item.cameraList.length;j++){
              var camera = item.cameraList[j];
              if(camera.isMajor){
                mainVideoUrl = camera.livePath;
              }
            }

            if (!courtList[item.sportType]) {
              courtList[item.sportType] = [];
            }
            if (!currentIndex) {
              currentIndex = item.sportType;
            }

            courtList[item.sportType].push({
              name: item.name,
              id: item.id
            });
          }

          $scope.sportType = sportType;
          $scope.court = courtList[currentIndex];
          $scope.stadiumName = data.stadium.name;
          $scope.address = data.stadium.address;
          initTop(data.stadium);
          cb && cb();
        })
      };

      $scope.$on('timeline.update.next',
        function (event) {
        requestTimeLine();
      });

      var stadiumId = $stateParams.courtId;
      var pageIndex = 1;
      var current = {};
      var requesting = false;
      var requestTimeLine = function (obj){
        if(requesting){
          return;
        }

        var obj = obj || {};
        if(obj.newRequest){
          pageIndex = 1;
          $scope.showLoading();
          timeLine.clean();
          current = obj;
        }

        var param = {
          stadiumId : current.stadiumId,
          pageSize : 10,
          pageIndex : pageIndex,
          sportType: current.sportType,
          courtId: current.courtId
        }

        requesting = true;
        var getTimeLineNext = detailModel.getTimeLineNext.post(param);
        getTimeLineNext.then(function (data) {
          requesting = false;
          $scope.hideLoading();
          var videos = data.videos;
          if (videos && videos.length > 0) {

            for (var i = 0; i < videos.length; i++) {
              timeLine.push(videos[i]);
            }
            pageIndex++;
            $scope.timeLine = timeLine.get();
          }
        })
      }

      function select(target){
        var selectedClass= $(target).parent().attr("data-selected-class");
        $(target).parent().children().removeClass(selectedClass);
        $(target).addClass(selectedClass);
      }
      function clearCourtClass(){
        $(".J_Court").removeClass("greenbder1");
      }

      $scope.showCourt = false;
      $scope.filterSport = function (scope, event) {
        select(event.target);
        clearCourtClass();
        $scope.showCourt = true;

        requestTimeLine({
          newRequest: true,
          stadiumId:stadiumId,
          sportType: scope.type
        });

        if($scope.sportType.length == 1){
          return;
        }
        $scope.court = courtList[scope.type];
      };

      $scope.filterCourt = function (scope, event) {
        event && select(event.target);
        var courtId = $(event.target).attr("data-id");
        requestTimeLine({
          newRequest: true,
          stadiumId:current.stadiumId,
          sportType: current.sportType,
          courtId: courtId
        });
      };
    }
  ]
})
