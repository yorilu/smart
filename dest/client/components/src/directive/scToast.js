angular.module("smartCourtLib").directive("scToast",["$rootScope",function(e){function r(e){var t={content:"text",timeout:2e3,callback:angular.noop};for(var n in e)switch(n){case"content":case"timeout":t[n]=e[n];break;case"callback":t[n]=typeof e[n]=="function"?e[n]:angular.noop}return t}var t=e,n='<a href="javascript:void(0);" class="toast_page" ng_hide="!_isshow" ng-click="toastClick()"><span class="succbtn">{{_toastModel.content}}</span></a>';return{restrict:"E",template:n,replace:!0,scope:[],link:function(e,n,i){e._timeout=null,e._isshow=!1,e.$on("SC_TOAST_SHOW",function(n,i){e._toastModel=r(i),t.$broadcast("SC_MASK_SHOW"),e._isshow=!0,clearTimeout(e._timeout),e._timeout=setTimeout(function(){e.toastClick(),e.$apply()},e._toastModel.timeout)}),e.$on("SC_TOAST_HIDE",function(t){e.toastClick()}),e.$on("SC_MASK_CLICK",function(t){e._timeout&&clearTimeout(e._timeout),e._isshow&&(e._isshow=!1,e._toastModel&&e._toastModel.callback&&e._toastModel.callback())}),e.toastClick=function(){e._timeout&&clearTimeout(e._timeout),e._isshow=!1,t.$broadcast("SC_MASK_HIDE"),e._toastModel&&e._toastModel.callback&&e._toastModel.callback()}}}}])