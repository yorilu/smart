/**
 * Created by anders on 15/4/14.
 */
/**
 * @ngdoc service
 * @name smartCourtLib.scUtil
 * @description
 *  工具方法集合
 * */
angular.module('smartCourtLib').factory('scUtil', ['$window', '$log',
  function ($window, $log) {

    /**
     * 视频播放器组件
     * @param element
     * @constructor
     */
    var VideoPlayer = function (element,title) {
      if (typeof element == "string") {
        this.video = document.querySelector(element);
      } else {
        this.video = element;
      }
      this.videoId = this.video.id;
      this.setTitle(title);

      var self = this;
      //关闭s
      $(this.video).on('webkitfullscreenchange mozfullscreenchange fullscreenchange', function (e) {
        var state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
        if (!state) {
          document.title = document.org_title;
          self.video.pause();
        }
      })
    };

    VideoPlayer.prototype = {

      /**
       * 是否静音
       */
      isMuted: function () {
        return this.video.muted;
      },

      /**
       * 是否暂停
       */
      isPaused: function () {
        return this.video.paused;
      },

      setTitle: function(title){
        this.title = title ? title : '';
      },
      setPoster:function(path){
        this.video.poster = path;
      },
      /**
       * 载入视频
       * @param src
       */
      load: function (src, autoLoad) {
        if(this.video.src != src){
          this.video.src = src;
        }
        if (!!autoLoad) {
          this.video.load();
        }
      },

      /**
       * 播放
       */
      play: function () {
        if(this.title){
          document.org_title = document.title;
          document.title = this.title;
        }

        if (scUtil.os.isIOS && scUtil.browser.UC) {
          $('#' + this.videoId).trigger('click');
        } else {
          this.video.play()
        }
      },

      /**
       * 暂停
       */
      pause: function () {
        this.video.pause();
      },

      /**
       * 全屏
       */
      fullscreen: function () {
        var methods = ['requestFullscreen',
          'webkitRequestFullscreen',
          'mozRequestFullScreen',
          'oRequestFullscreen',
          'msRequestFullscreen',
          'webkitEnterFullScreen'];
        try {
          for(var i in methods){
            var method = methods[i];
            if(this.video[method]){
              this.video[method]();
              break;
            }
          }
        } catch (e) {
          $log.log(e);
          return false;
        }
        return true;
      },

      /**
       * 退出全屏
       */
      exitFullscreen: function () {
       // scUtil.invokeHtml5NewMethod(this.video, 'exitFullScreen');
      },
      /**
       *
       * @param eventName
       * @param eventHandle
       */
      bind: function (eventName, eventHandle) {
        this.video.addEventListener(eventName, eventHandle, false);
      },

      /**
       * 移除事件处理
       * @param eventFunName
       */
      unbind: function (eventFunName) {
        this.video.removeEventListener(eventFunName)
      }
    };


    var ua = navigator.userAgent;

    var scUtil = {

      /**
       * 设备信息
       */
      os: {
        isAndroid: ua.indexOf('Android') > 0,
        isIOS: /iP(ad|hone|od)/.test(ua)
      },

      /**
       * 浏览器信息
       */
      browser: {
        QQ: ua.indexOf('MQQBrowser') > 0,
        UC: ua.indexOf('UCBrowser') > 0,
        MIUI: ua.indexOf('MiuiBrowser') > 0,
        WeiXin: ua.indexOf('MicroMessage') > 0,
        Chrome: !!window.chrome
      },

      /**
       * 视频播放组件
       */
      VideoPlayer: VideoPlayer,


      now: function () {
        return (new Date()).getTime();
      },
      /*
       * @desc 节流函数，功能是某个function 最多在某时间内触发一次。
       * 比如 var fn = function (){};
       * window.onscroll = function (){
       * 	fn();
       * }
       *  该fn函数 最多2秒内只执行一次。
       *
       */
      throttle: function (func, wait, options) {
        var context,
          args,
          result,
          that = this;
        var timeout = null;
        var previous = 0;
        if (!options)
          options = {};
        var later = function () {
          previous = options.leading === false ? 0 : that.now();
          timeout = null;
          result = func.apply(context, args);
          if (!timeout)
            context = args = null;
        };
        return function () {
          var now = that.now();
          if (!previous && options.leading === false)
            previous = now;
          var remaining = wait - (now - previous);
          context = this;
          args = arguments;
          if (remaining <= 0 || remaining > wait) {
            clearTimeout(timeout);
            timeout = null;
            previous = now;
            result = func.apply(context, args);
            if (!timeout)
              context = args = null;
          } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
          }
          return result;
        };
      },
      /*
       * @desc 节流函数，功能是某个function 在最后一次执行停止后某时间内触发。
       * 比如 var fn = function (){};
       * window.onscroll = function (){
       * 	fn();
       * }
       *  该fn函数 在scroll停止后2秒内若没有新的触发scroll 则触发该fn 函数。
       *
       */
      debounce: function (func, wait, immediate) {
        var timeout,
          args,
          context,
          timestamp,
          result,
          that = this;

        var later = function () {
          var last = that.now() - timestamp;
          if (last < wait && last > 0) {
            timeout = setTimeout(later, wait - last);
          } else {
            timeout = null;
            if (!immediate) {
              result = func.apply(context, args);
              if (!timeout)
                context = args = null;
            }
          }
        };
        return function () {
          context = this;
          args = arguments;
          timestamp = that.now();
          var callNow = immediate && !timeout;
          if (!timeout)
            timeout = setTimeout(later, wait);
          if (callNow) {
            result = func.apply(context, args);
            context = args = null;
          }

          return result;
        };
      },
      getPageScrollPos: function () {
        var left = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft),
          top = Math.max(document.documentElement.scrollTop, document.body.scrollTop),
          height = Math.min(document.documentElement.clientHeight, document.body.clientHeight),
          width = Math.min(document.documentElement.clientWidth, document.body.clientWidth),
          pageWidth = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
          pageHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
        return {
          top: top,
          left: left,
          height: height,
          width: width,
          pageWidth: pageWidth,
          pageHeight: pageHeight
        }
      },


      /**
       * 全屏
       * @param element
       */
      fullScreen: function (element) {
        if (this.os.isIOS) {
          return;
        }
        var player = new VideoPlayer(element);
        player.fullscreen();
      },
      exitFullScreen: function (){
        if (document.exitFullscreen) { 
          document.exitFullscreen(); 
        } else if (document.msExitFullscreen) { 
          document.msExitFullscreen(); 
        } else if (document.mozCancelFullScreen) { 
          document.mozCancelFullScreen(); 
        } else if(document.oRequestFullscreen){ 
          document.oCancelFullScreen(); 
        }else if (document.webkitExitFullscreen){ 
          document.webkitExitFullscreen(); 
        }
      },
      downloadApp: function () {
        if (this.os.isAndroid) {
          return 'http://www.pgyer.com/YLj1';
        } else if (this.os.isIOS) {
          return 'http://www.pgyer.com/dpam';
        } else {
          return '';
        }
      },

      rtmp2m3u8: function (url) {
        if (/^rtmp/.test(url)) {
          return url = url.replace(/^rtmp/, "http") + "/playlist.m3u8";
        } else {
          return url;
        }
      }
    }

    return scUtil;
  }
]);
