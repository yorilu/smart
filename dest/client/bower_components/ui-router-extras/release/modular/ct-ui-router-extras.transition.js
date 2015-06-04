/**

 * UI-Router Extras: Sticky states, Future States, Deep State Redirect, Transition promise
 * Module: transition
 * @version 0.0.13
 * @link http://christopherthielen.github.io/ui-router-extras/
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

(function(e,t){e.module("ct.ui.router.extras.transition",["ct.ui.router.extras.core"]).config(["$provide",function(t){t.decorator("$state",["$delegate","$rootScope","$q","$injector",function(t,n,r,i){function f(t){var n=i.invoke,r=i.instantiate;return i.invoke=function(r,i,s){return n(r,i,e.extend({$transition$:t},s))},i.instantiate=function(n,i){return r(n,e.extend({$transition$:t},i))},function(){i.invoke=n,i.instantiate=r}}function l(){a.pop()(),u.pop(),o--}function c(e,t){return function(i){return l(),n.$broadcast("$transitionSuccess",t),e.resolve(i),i}}function h(e,t){return function(s){return l(),n.$broadcast("$transitionError",t,s),e.reject(s),r.reject(s)}}var s=t.transitionTo,o=-1,u=[],a=[];return t.transitionTo=function(e,n,i){var f=r.defer(),l=u[++o]={promise:f.promise};a[o]=function(){};var p=s.apply(t,arguments);return p.then(c(f,l),h(f,l))},n.$on("$stateChangeStart",function(t,r,i,s,l){var c=o,h=e.extend(u[c],{to:{state:r,params:i},from:{state:s,params:l}}),p=f(h);a[c]=p,n.$broadcast("$transitionStart",h)}),t}])}])})(angular)