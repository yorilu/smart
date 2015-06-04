/**
 * @ngdoc directive
 * @name scVideo
 *
 * @description
 * sc-video-container will watch the poster property of child video dom. and will create mask to your video and somthing.
 * <sc-video-container class="video-con" playvideo="playing">
 *   <video class="video-handler J_MainVideo" src="{{mainCourt.mainLiveUrl}}" poster="{{mainCourt.mainSnapshot}}" controls></video>
 * </sc-video-container>
 *
 * @restrict E
 * @param playvideo play video when true
 * */
angular.module('smartCourtLib').directive('scVideoContainer', ['scUtil','$document','$rootScope',function (scUtil,$document,$rootScope) {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: {
      playvideo: "="
    },
    template: '<div></div>',
    compile: function (tElem, tAttrs) {
      var wrapCls;
      var template;
      var videoType = tAttrs['type'] ? tAttrs['type']: 'default';

      template =
        '<div class="outimag" ng-show="showMask"><img ng-src="{{poster}}"/></div>' +
        '<div ng-show="showMask" class="vepagic"></div>' +
        '<div ng-show="showMask" class="abtion zinde"><a class="dwnapp">想看不同角度的视频，请下载安装 智慧运动场</a></div>' +
        '<div ng-transclude></div>';
      wrapCls = 'repst detail-main-video';


      tElem.html(template);
      tElem.addClass(wrapCls);
      /**
       * @ngdoc function
       * @name link
       * @methodOf smartCourtLib.directive:scVideo
       * @description
       * 该directive给video增加一个遮罩，上面可以有任何div文字等
       * 监听video.poster, 给遮罩增加一个poster
       * 监听playvideo, 若为true 则开始播放该视频
       * 监听video.src, 若有改变并且 playvideo为 true则直接播放
       *
       */
      return function ($scope, elem, attr) {

        var $elem = $(elem[0]);
        var $video = $elem.find("video");
        var video = $video[0];
        $scope.showMainVideo = true;

        var watchHanlder = $scope.$watch(function () {
          return video.poster;
        }, function (newValue, oldValue, scope) {
          if (newValue != "" && /\.jpg|\.png/.test(newValue)) {
            $scope.poster = newValue;
            watchHanlder();//recycle.
          }
        });

        $scope.$watch(function () {
          return video.src;
        }, function (newValue, oldValue, scope) {
          if (newValue != oldValue && $scope.playvideo) {
            setTimeout(function () {
              video.play();
            }, 50);
          }
        });

        $scope.$watch(function(){
          return video.title;
        },function(newValue, oldValue,scope){
          if (newValue) {
            //window.name = document.title;
             scope.title = newValue;
          }
        });

        $scope.$watch(function () {
          return $scope.playvideo;
        }, function (newValue, oldValue, scope) {
          if (newValue) {
            setTimeout(function () {
              video.play();
            }, 50);
          }
        });

        $scope.play = function () {
          $scope.playvideo = true;
          video.play();
          scUtil.fullScreen(video);

          $scope.setTitle(video.title);
        };

        $scope.showMask = true;


        $video.on("play", function () {
          $(video).removeClass("videohide");
          setTimeout(function() {
            $scope.showMask = false;
            $scope.$apply();
          }, 500)
        });

        $video.on("pause ended", function (e) {
          $scope.showMask = true;
          $scope.playvideo = false;
          $(video).addClass("videohide");
          $scope.$apply();
        });

        $video.on("error", function (e) {
          if($scope.playvideo){
            $scope.playvideo = false;
          }
        });

        $video.bind('webkitfullscreenchange mozfullscreenchange fullscreenchange', function(e) {
          var state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
          if(!state){
            video.pause && video.pause();
          }
        });
      }
    }
  };
}]);
