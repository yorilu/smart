var App=angular.module("app",["ui.router","oc.lazyLoad"]).config(function(e,t,n,r){n.otherwise("/"),t.hashPrefix("!"),e.state("index",{url:"/",views:{lazyLoadView:{controller:"AppCtrl",templateUrl:"partials/main.html"}},resolve:{loadMyCtrl:["$ocLazyLoad",function(e){return e.load("js/AppCtrl.js")}]}}).state("modal",{parent:"index",resolve:{loadOcModal:["$ocLazyLoad","$injector","$rootScope",function(e,t,n){return e.load(["bower_components/bootstrap/dist/css/bootstrap.css","bower_components/ocModal/dist/css/ocModal.animations.css","bower_components/ocModal/dist/css/ocModal.light.css","bower_components/ocModal/dist/ocModal.js","partials/modal.html"]).then(function(){n.bootstrapLoaded=!0;var e=t.get("$ocModal");e.open({url:"modal",cls:"fade-in"})})}],setModalBtn:["loadOcModal","$rootScope","$ocModal",function(e,t,n){t.openModal=function(){n.open({url:"modal",cls:"flip-vertical"})}}]}}),t.html5Mode(!1),r.config({debug:!0,events:!0,modules:[{name:"gridModule",files:["js/gridModule.js"]}]})})