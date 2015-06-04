/**
 * Created by danny zou on 15/4/20.
 */
/**
 * 滚动条下拉加载服务，调用完全与携程onBottomPull()相同
 * */
angular.module('smartCourtLib').service('scScroll', ['scUtil',
    function (scUtil) {

      var scScrollService = {

        onWidnowScroll : null,
        __isLoading__ : false,

        /*
         * 增加监听
         */
        addScrollListener : function () {
          this.__isLoading__ = false;
          this._onWidnowScroll = $.proxy(this.onWidnowScroll, this);
          $(window).on('scroll', this._onWidnowScroll);
        },

        /*
         * 移除监听
         */
        removeScrollListener : function () {
          $(window).off('scroll', this._onWidnowScroll);
        },

        onWidnowScroll : function () {
          var pos = scUtil.getPageScrollPos();
          if (pos.top == 0)
            return;
          var h = pos.pageHeight - (pos.top + pos.height);
          if (h <= 81 && !this.__isLoading__) {
            this.__isLoading__ = true;
            this.onBottomPull && this.onBottomPull();
          }
        },

        endPull : function () {
          this.__isLoading__ = false;
        }

      }

      return scScrollService;
    }
  ]);
