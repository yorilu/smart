angular.module("smartCourtLib").service("scAlert",["$http","$document","$q","$rootScope","$compile",function(e,t,n,r,i){var s=1200,o=0,u=angular.element('<div style="width: 100%; height: 1447px; position: absolute; left: 0px; top: 0px; z-index: 3003;position: fixed !important;background-color: rgba(0,0,0,.5);right: 0;bottom: 0;" id="ui-view-4"></div>');u.css("z-index",s);var a='<div class="cui-pop-box" style="background: #fff;width: 280px;margin: auto;position: relative;    overflow: hidden;    border-radius: 3px;    z-index: 9999;"><div class="cui-bd" style="color: #000;"><div class="cui-error-tips" style="color: #000;    padding: 20px;    text-align: center;">{{content}}</div><div class="cui-roller-btns" style="background: #fff;    border-top: 1px solid #bcbcbc;    line-height: 18px;    text-align: center;    -webkit-box-sizing: border-box;    -moz-box-sizing: border-box;    box-sizing: border-box;    display: flex;    width: 100%;  };"><div class="cui-flexbd cui-btns-ok" style="padding: 12px 0;    color: #099fde;    -webkit-box-flex: 1;    -moz-box-flex: 1;    -webkit-flex: 1;    -ms-flex: 1;    flex: 1;" ng-show="ok" ng-click="ok()">确定</div></div></div></div>',f={alert:function(e){var l=n.defer(),c;o++,o==1&&t.find("body").append(u);var h=r.$new();return angular.extend(h,e),h.ok=function(){f.dismiss(c),l.resolve("ok")},h.close=function(){f.dismiss(c),l.resolve("ok")},c=i(a)(h),t.find("body").append(c),c.css("display","block"),c.css("z-index",s+o),l.promise},confirm:function(e){var l=n.defer(),c;o++,o==1&&t.find("body").append(u);var h=r.$new();return angular.extend(h,e),h.ok=function(){f.dismiss(c),l.resolve("ok")},h.cancel=function(){f.dismiss(c),l.reject("cancel")},h.close=function(){f.dismiss(c),l.reject("cancel")},c=i(a)(h),t.find("body").append(c),c.css("display","block"),c.css("z-index",s+o),l.promise},dismiss:function(e){o--,e.remove(),o==0&&u.remove()}};return f}])