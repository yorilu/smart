/**
 * @ngdoc directive
 * @name lazySrc
 * @description lazy load src on dom element whatever you want.
 * @restrict A
 * @param  lazySrc
 * eg:
 *	<img lazy-src=""/>
 *  <iframe lazy-src=""/>
 *  <script lazy-src=""/></script>
 * */
angular.module('smartCourtLib')
.directive('lazySrc', ['$window', '$document', 'scUtil', function (win, $doc, scUtil) {

      var $win = angular.element(win),
      doc = $doc[0],
      inited = false,
      /**
       * @ngdoc function
       * @name elements
       * @methodOf smartCourtLib.directive:lazySrc
       * @description
       *  elements 维护该dom列队
       * @example
       */
      elements = (function () {
        var _uid = 0;
        var _list = {}
        return {
          push : function (_data) {
            _list[_uid++] = _data;
            setTimeout(function () {
              checkImage(_data);
            });
          },
          del : function (key) {
            _list[key] && delete _list[key];
          },
          size : function () {
            return Object.keys(_list).length;
          },
          get : function () {
            return _list;
          },
          getOne : function (i) {
            return _list[i];
          }
        }
      })(),
      /**
       * @ngdoc function
       * @name isVisible
       * @methodOf smartCourtLib.directive:lazySrc
       * @description
       *  检查该dom是否显示在可见区域
       * @example
       */
      isVisible = function (elem) {
        var rect = elem[0].getBoundingClientRect();
        var ret = true;
        if (rect.height > 0 && rect.width > 0) {
          ret = rect.top >= 0 && (rect.top + rect.height / 3) < Math.max(doc.documentElement.clientHeight, win.innerHeight || 0);
        }
        return ret;
      },
      /**
       * @ngdoc function
       * @name checkImage
       * @methodOf smartCourtLib.directive:lazySrc
       * @description
       *  循环检查所有图片是否可见
       * @example
       */
      checkImage = function (evt, i, item) {
        var that = this;
        console.log('------------------');
        if (i >= 0 && item) {
          return isVisible(item.elem) ? load(i) : false;
        } else if (elements.size() == 0) {
          $win.off('scroll', checkImage);
          $win.off('resize', checkImage);
          inited = false;
        } else {
          angular.forEach(elements.get(), function (item, key) {
            isVisible(item.elem) && load(key);
          });
        }
      },
      /**
       * @ngdoc function
       * @name initLazyLoad
       * @methodOf smartCourtLib.directive:lazySrc
       * @description
       *  初始化scroll和resize事件
       * @example
       */
      initLazyLoad = function () {
        if (inited === false) {
          inited = true;
          $win.on('scroll', checkImage);
          $win.on('resize', checkImage);
        }
      },
       /**
       * @ngdoc function
       * @name load
       * @methodOf smartCourtLib.directive:lazySrc
       * @description
       *  加载一个图片
       * @example
       */
      load = function (key) {
        var item = elements.getOne(key);
        var $elem = item.elem;
        var lazySrc = item.attr.lazySrc;
        $elem.data('cssText') && ($elem[0].style.cssText = $elem.data('cssText'));
        $elem.removeClass('ng-lazyload').removeAttr("lazy-src");
        $elem.attr('src', lazySrc);
        key >= 0 && elements.del(key);
        return true;
      };

      /**
       * @ngdoc function
       * @name debounce
       * @methodOf smartCourtLib.directive:lazySrc
       * @description
       *  debounce 200毫秒 防止过度频繁触发
       * @example
       */
      checkImage = scUtil.debounce(checkImage, 200);

      return {
        restrict : 'A',
        scope : {},
        link : function ($scope, $elem, attr) {
          $elem[0].style.cssText && $elem.data('cssText', $elem[0].style.cssText);
          $elem.css({
            'min-width' : '1px',
            'min-height' : '1px'
          });
          elements.push({
            elem : $elem,
            attr : attr
          });
          initLazyLoad();
        }
      };
    }
  ]);
