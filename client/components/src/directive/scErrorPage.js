/**
 * Created by danny zou on 15/5/4.
 */

/**
 * @ngdoc directive
 * @name smartCourtLib.directive:scErrorPage
 * @description
 *  errorPage组件
 *
 *  ##用法
 *  <pre>
 *  $scope.showErrorPage($dom, isLocationReload)
 *  $dom：不必须
 *  如果不传的话默认将errorpage注入到ngview的根div里
 *  如果传的话则需要传入一个JQuery的dom对象（如$('#id')）,则404会注入到传入对象的元素中
 *  isLocationReload：不必须，true：window.location.reload(),不传则使用$state.reload()
 *  </pre>
 */
angular.module("smartCourtLib")
  .directive('scErrorPage', ["$compile", "$window", '$state', function($compile, $window, $state) {
    var TEMPLATE =
      '<section> \n' +
      '<div class="erropg">\n' +
      '<a  href="javascript:void(0);" ng-click="reLoad()" class="erro1"></a>\n' +
      '<span>没有网络</span>\n' +
      '<a  href="javascript:void(0);">请将手机连接到网络</a>\n' +
      '</div>\n' +
      '</section>';
    return {
      restrict: 'A',

      link: function($scope, element, attrs) {
        $scope.showErrorPage = function($dom, isLocationReload) {
          $scope.reLoad = function() {
            isLocationReload ? $window.location.reload() : $state.reload();
          }
          var ele = angular.element($dom);
          ele = (ele && ele.length > 0) ? ele : element;
          var head = ele.find('header');
          ele.html('');
          //如果当前容器中有header的话，则仍然将header添加进去
          if (head && head.length > 0) {
            ele.html('').append($compile(head)($scope));
          }
          ele.append(
            $compile(TEMPLATE)($scope)
          );
        };

      }
    };
  }]);