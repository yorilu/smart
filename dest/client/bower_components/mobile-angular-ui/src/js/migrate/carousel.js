(function(){angular.module("mobile-angular-ui.migrate.carousel",[]).run(["$rootScope",function(e){e.carouselPrev=function(t){e.$emit("mobile-angular-ui.carousel.prev",t)},e.carouselNext=function(t){e.$emit("mobile-angular-ui.carousel.next",t)};var t=function(e){var t=angular.element(document.getElementById(e)),n=angular.element(t.children()[0]).children();return t=null,n},n=function(e){var t=-1,n=!1;for(var r=0;r<e.length;r++){var i=e[r];t+=1;if(angular.element(i).hasClass("active")){n=!0;break}}return n?t:-1};e.$on("mobile-angular-ui.carousel.prev",function(e,r){var i=t(r),s=n(i),o=i.length-1;s!==-1&&angular.element(i[s]).removeClass("active"),s<=0?angular.element(i[o]).addClass("active"):angular.element(i[s-1]).addClass("active"),i=null,s=null,o=null}),e.$on("mobile-angular-ui.carousel.next",function(e,r){var i=t(r),s=n(i),o=i.length-1;s!==-1&&angular.element(i[s]).removeClass("active"),s===o?angular.element(i[0]).addClass("active"):angular.element(i[s+1]).addClass("active"),i=null,s=null,o=null})}])})()