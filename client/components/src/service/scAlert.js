/**
 * Created by danny zou on 15/4/14.
 */
/**
// 调用：scAlert.alert({
//       title: "测试",
//       content: "你好，我是警告"
//     })
//       .then(function () {
//         alert("你刚才点了确定");
//       });
 * */
angular.module("smartCourtLib").service("scAlert", ["$http", "$document", "$q", "$rootScope", "$compile",
    function ($http, $document, $q, $rootScope, $compile) {
      var zIndex = 1200;
      var dialogCounter = 0;

      var mask = angular.element('<div style="width: 100%; height: 1447px; position: absolute; left: 0px; top: 0px; z-index: 3003;position: fixed !important;background-color: rgba(0,0,0,.5);right: 0;bottom: 0;" id="ui-view-4"></div>');
      mask.css("z-index", zIndex);

      var template = '<div class="cui-pop-box" style="' + 'background: #fff;width: 280px;margin: auto;position: relative;    overflow: hidden;    border-radius: 3px;    z-index: 9999;">' + '<div class="cui-bd" style="color: #000;">' + '<div class="cui-error-tips" style="color: #000;    padding: 20px;    text-align: center;">' + '{{content}}' + '</div>' + '<div class="cui-roller-btns" style="background: #fff;    border-top: 1px solid #bcbcbc;    line-height: 18px;    text-align: center;    -webkit-box-sizing: border-box;    -moz-box-sizing: border-box;    box-sizing: border-box;    display: flex;    width: 100%;  };">' + '<div class="cui-flexbd cui-btns-ok" style="padding: 12px 0;    color: #099fde;    -webkit-box-flex: 1;    -moz-box-flex: 1;    -webkit-flex: 1;    -ms-flex: 1;    flex: 1;" ng-show="ok" ng-click="ok()">' + '确定' + '</div>' + '</div>' + '</div>' + '</div>';

      var service = {
        alert : function (param) {
          var defer = $q.defer();

          var dialog;
          dialogCounter++;

          if (dialogCounter == 1) {
            $document.find("body").append(mask);
          }

          var data = $rootScope.$new();
          angular.extend(data, param);

          data.ok = function () {
            service.dismiss(dialog);
            defer.resolve("ok");
          };
          data.close = function () {
            service.dismiss(dialog);
            defer.resolve("ok");
          };

          dialog = $compile(template)(data);

          $document.find("body").append(dialog);
          dialog.css("display", "block");
          dialog.css("z-index", zIndex + dialogCounter);
          return defer.promise;

        },
        confirm : function (param) {
          var defer = $q.defer();

          var dialog;
          dialogCounter++;

          if (dialogCounter == 1) {
            $document.find("body").append(mask);
          }

          var data = $rootScope.$new();
          angular.extend(data, param);

          data.ok = function () {
            service.dismiss(dialog);
            defer.resolve("ok");
          };
          data.cancel = function () {
            service.dismiss(dialog);
            defer.reject("cancel");
          };
          data.close = function () {
            service.dismiss(dialog);
            defer.reject("cancel");
          };

          dialog = $compile(template)(data);

          $document.find("body").append(dialog);
          dialog.css("display", "block");
          dialog.css("z-index", zIndex + dialogCounter);

          return defer.promise;
        },
        dismiss : function (dialog) {
          dialogCounter--;
          dialog.remove();

          if (dialogCounter == 0) {
            mask.remove();
          }
        }
      };

      return service;
    }
  ]);
