(function(){var e=angular.module("mobile-angular-ui.components.navbars",[]);angular.forEach(["top","bottom"],function(t){var n="navbarAbsolute"+t.charAt(0).toUpperCase()+t.slice(1);e.directive(n,["$rootElement",function(e){return{restrict:"C",link:function(n,r){e.addClass("has-navbar-"+t),n.$on("$destroy",function(){e.removeClass("has-navbar-"+t)})}}}])})})()