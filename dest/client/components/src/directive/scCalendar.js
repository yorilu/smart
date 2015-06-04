angular.module("smartCourtLib").factory("pickadateUtils",["$locale",function(e){function t(e){switch(e){case"dd":return"day";case"MM":return"month";case"yyyy":return"year"}}return{parseDate:function(e,n){if(!e)return;if(angular.isDate(e))return new Date(e);n=n||"yyyy-MM-dd";var r="(dd|MM|yyyy)",i=n.match(/[-|/]/)[0],s=e.split(i),o=new RegExp([r,r,r].join(i)),u=n.match(o),a={};u.shift(),angular.forEach(u,function(e,n){a[t(e)]=parseInt(s[n],10)});if(isNaN(a.year)||isNaN(a.month)||isNaN(a.day))return;return new Date(a.year,a.month-1,a.day,3)},buildDates:function(e,t){var n=[],r=new Date(e.getFullYear(),e.getMonth()+1,0,3);t=t||{},e=new Date(e);while(e.getDay()!==t.weekStartsOn)e.setDate(e.getDate()-1);for(var i=0;i<42;i++){if(t.noExtraRows&&e.getDay()===t.weekStartsOn&&e>r)break;n.push(new Date(e)),e.setDate(e.getDate()+1)}return n},buildDayNames:function(t){var n=e.DATETIME_FORMATS.SHORTDAY;if(t){n=n.slice(0);for(var r=0;r<t;r++)n.push(n.shift())}return n}}}]).directive("pickadate",["$compile","$document","$window","pickadateUtils","dateFilter",function(e,t,n,r,i){var s='<div class="pickadate" ng-show="displayPicker" ng-style="styles"><div class="pickadate-header"><div class="pickadate-controls"><a href="" class="pickadate-prev" ng-click="changeMonth(-1)" ng-show="allowPrevMonth">prev</a><a href="" class="pickadate-next" ng-click="changeMonth(1)" ng-show="allowNextMonth">next</a></div><h3 class="pickadate-centered-heading">{{currentDate | date:"MMMM yyyy"}}</h3></div><div class="pickadate-body"><div class="pickadate-main"><ul class="pickadate-cell"><li class="pickadate-head" ng-repeat="dayName in dayNames">{{dayName}}</li></ul><ul class="pickadate-cell"><li ng-repeat="d in dates" ng-click="setDate(d)" ng-class="classesFor(d)">{{d.dateObj | date:"d"}}</li></ul></div></div></div>';return{require:"ngModel",scope:{defaultDate:"=",minDate:"=",maxDate:"=",disabledDates:"=",weekStartsOn:"=",dateHandler:"&"},link:function(o,u,a,f){function S(){var e=new Date(o.currentDate.getFullYear(),o.currentDate.getMonth(),1,3),t=e.getMonth()+1,n=r.buildDates(e,{weekStartsOn:p,noExtraRows:c}),s=[],u=i(new Date,g),a=new Date(e);a.setMonth(t),o.allowPrevMonth=!y||e>y,o.allowNextMonth=!b||a<=b,o.dayNames=r.buildDayNames(p);for(var f=0;f<n.length;f++){var l=[],h=n[f],d=i(h,g),v=C(d);N(h)||v?l.push("pickadate-disabled"):l.push("pickadate-enabled"),v&&l.push("pickadate-unavailable"),d===u&&l.push("pickadate-today"),s.push({date:d,dateObj:h,classNames:l})}o.dates=s}function x(e,t){t=t||{},h?f.$setViewValue(e):f.$setViewValue(e[0]),t.skipRenderInput||u.val(f.$viewValue)}function T(e){var t=[];for(var n=0;n<e.length;n++){var i=e[n];!C(i)&&!N(r.parseDate(i,g))&&t.push(i)}return t}function N(e){return e<y||e>b||i(e,"M")!==i(o.currentDate,"M")}function C(e){return l.call(o.disabledDates||[],e)>=0}function k(e,t){var n=l.call(t,e);return n===-1?t.push(e):t.splice(n,1),t}var l=[].indexOf||function(e){for(var t=0,n=this.length;t<n;t++)if(t in this&&this[t]===e)return t;return-1},c=a.hasOwnProperty("noExtraRows"),h=a.hasOwnProperty("multiple"),p=o.weekStartsOn,d=[],v=u[0]instanceof HTMLInputElement,m=e(s)(o),g=(a.format||"yyyy-MM-dd").replace(/m/g,"M"),y,b;o.displayPicker=!v;if(!angular.isNumber(p)||p<0||p>6)p=0;o.setDate=function(e){if(N(e.dateObj)||C(e.date))return;d=h?k(e.date,d):[e.date],x(d),o.displayPicker=!v,o.dateHandler({date:e})};var w=f.$render=function(e){e=e||{},angular.isArray(f.$viewValue)?d=f.$viewValue:f.$viewValue&&(d=[f.$viewValue]),o.currentDate=r.parseDate(o.defaultDate,g)||r.parseDate(d[0],g)||new Date,d=T(d),x(d,e),S()};o.classesFor=function(e){var t=l.call(d,e.date)>=0?"pickadate-active":null;return e.classNames.concat(t)},o.changeMonth=function(e){o.currentDate.setDate(1),o.currentDate.setMonth(o.currentDate.getMonth()+e),S()},o.$watch(function(){return angular.toJson([o.minDate,o.maxDate,o.disabledDates])},function(){y=r.parseDate(o.minDate,g)||new Date(0),b=r.parseDate(o.maxDate,g)||new Date(99999999999999),w()});if(v){var E=function(e){o.displayPicker=e,o.$apply()};u.on("focus",function(){var e=n.pageXOffset!==undefined,r=(t.compatMode||"")==="CSS1Compat",i=e?n.pageXOffset:r?t.documentElement.scrollLeft:t.body.scrollLeft,s=e?n.pageYOffset:r?t.documentElement.scrollTop:t.body.scrollTop,a=n.innerWidth||t.documentElement.clientWidth||t.body.clientWidth;o.styles={top:s+u[0].getBoundingClientRect().bottom+"px"},a-u[0].getBoundingClientRect().left>=300?o.styles.left=i+u[0].getBoundingClientRect().left+"px":o.styles.right=a-u[0].getBoundingClientRect().right-i+"px",E(!0)}),u.on("keydown",function(e){l.call([9,13,27],e.keyCode)>=0&&E(!1)}),o.$watch(function(){return f.$viewValue},function(e){var t=r.parseDate(e,g);t&&w({skipRenderInput:!0}),f.$setValidity("date",!!t)}),t.on("click",function(e){var t=function(e,t){var n=t.parentNode;while(n!==null){if(n===e)return!0;n=n.parentNode}return!1};if(t(m[0],e.target)||e.target===u[0])return;E(!1)}),o.$$postDigest(function(){a.value&&(f.$viewValue=a.value,w())}),u.after(m.addClass("pickadate-modal"))}else u.append(m)}}}])