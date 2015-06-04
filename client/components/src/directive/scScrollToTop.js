/**
 * @ngdoc directive
 * @name scScrollToTop
 * @description scroll to top widget
 * @restrict E
 * eg:
 *	<sc-scrolltotophandler></sc-scrolltotophandler>
 * */
angular.module('smartCourtLib')
.directive('scScrolltotophandler', ['$window', '$document', 'scUtil', function (win, $doc, scUtil) {

      var $win = angular.element(win),
      doc = $doc[0];
      
      /**
       * @ngdoc function
       * @name check
       * @methodOf smartCourtLib.directive:scScrollToTop
       * @description
       *  检查是否超过某个高度，则显示该控件
       * @example
       */
      var check = function ($elem) {
        console.log('------------------------')
        if (document.body.scrollTop < 200) {
          $($elem[0]).addClass("hidden");
        } else {
          $($elem[0]).removeClass("hidden");
        }
      }
      
      /**
       * @ngdoc function
       * @name throttle
       * @methodOf smartCourtLib.directive:scScrollToTop
       * @description
       *  用throttle 控件每隔500毫秒，防止频繁触发
       * @example
       */
      var check = scUtil.throttle(check, 500);
      return {
        restrict : 'E',
        replace : true,
        template : '<div class="returntop hidden"></div>',
        link : function ($scope, $elem, attr) {
          angular.element(doc).on("scroll", function () {
            check($elem);
          });
          angular.element($elem[0]).on("click", function (event) {
            document.body.scrollTop = 0;
          });
        }
      };
    }
  ]);
