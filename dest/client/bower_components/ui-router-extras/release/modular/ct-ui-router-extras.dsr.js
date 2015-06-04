/**

 * UI-Router Extras: Sticky states, Future States, Deep State Redirect, Transition promise
 * Module: dsr
 * @version 0.0.13
 * @link http://christopherthielen.github.io/ui-router-extras/
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

(function(e,t){function r(){n=t}var n;e.module("ct.ui.router.extras.dsr",["ct.ui.router.extras.core"]).config(["$provide",function(e){var t;e.decorator("$state",["$delegate","$q",function(e,i){return t=e.transitionTo,e.transitionTo=function(s,o,u){return u.ignoreDsr&&(n=u.ignoreDsr),t.apply(e,arguments).then(function(e){return r(),e},function(e){return r(),i.reject(e)})},e}])}]),e.module("ct.ui.router.extras.dsr").service("$deepStateRedirect",["$rootScope","$state","$injector",function(r,i,s){function l(e){var t=e.name;if(u.hasOwnProperty(t))return u[t];h(t)}function c(t){var n=t.deepStateRedirect||t.dsr;if(!n)return{dsr:!1};var r={dsr:!0};return e.isFunction(n)?r.fn=n:e.isObject(n)&&(r=e.extend(r,n)),e.isString(r.default)&&(r.default={state:r.default}),r.fn||(r.fn=["$dsr$",function(e){return e.redirect.state!=e.to.state}]),r}function h(e){var n=i.get(e);if(!n)return!1;var r=c(n);r.dsr&&(u[n.name]=a,o[e]===t&&(o[e]={}));var s=n.$$state&&n.$$state().parent;if(s){var l=h(s.self.name);l&&u[n.name]===t&&(u[n.name]=f)}return u[n.name]||!1}function p(n,r){r===!0&&(r=Object.keys(n));if(r===null||r===t)r=[];var i={};return e.forEach(r.sort(),function(e){i[e]=n[e]}),i}function d(t,n){function i(e){return e?e.toString():e}var r=p(t,n),s={};return e.forEach(r,function(e,t){s[t]=i(e)}),e.toJson(s)}var o={},u={},a="Redirect",f="AncestorRedirect";return r.$on("$stateChangeStart",function(t,r,u,f,h){var v=c(r);if(n||l(r)!==a&&!v.default)return;var m=d(u,v.params),g=o[r.name][m]||v.default;if(!g)return;var y={redirect:{state:g.state,params:g.params},to:{state:r.name,params:u}},b=s.invoke(v.fn,r,{$dsr$:y});if(!b)return;b.state&&(g=b),t.preventDefault();var w=p(u,v.params);i.go(g.state,e.extend(w,g.params))}),r.$on("$stateChangeSuccess",function(t,n,r,s,u){var a=l(n);if(a){var f=n.name;e.forEach(o,function(t,n){var s=c(i.get(n)),u=d(r,s.params);if(f==n||f.indexOf(n+".")!=-1)o[n][u]={state:f,params:e.copy(r)}})}}),{reset:function(t,n){if(!t)e.forEach(o,function(e,t){o[t]={}});else{var r=i.get(t);if(!r)throw new Error("Unknown state: "+t);if(o[r.name])if(n){var s=d(n,c(r).params);delete o[r.name][s]}else o[r.name]={}}}}}]),e.module("ct.ui.router.extras.dsr").run(["$deepStateRedirect",function(e){}])})(angular)