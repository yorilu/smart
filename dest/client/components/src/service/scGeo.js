angular.module("smartCourtLib").service("scGeo",["$window","$log","$q","$cacheFactory",function(e,t,n,r){var i=e.navigator.geolocation,s=r("geoCache"),o={getCurrentPosition:function(e){var r=n.defer(),o=s.get("currentPosition");if(o)return r.resolve(o),r.promise;var u={enableHighAcuracy:!1,timeout:3e3};angular.isObject(e)&&angular.extend(u,e);var a=function(e){t.debug("定位成功"+e.coords),s.put("currentPosition",e.coords),r.resolve(e.coords)},f=function(e){t.debug("定位失败"+e),r.reject(e)};return i.getCurrentPosition(a,f,u),r.promise}};return o}])