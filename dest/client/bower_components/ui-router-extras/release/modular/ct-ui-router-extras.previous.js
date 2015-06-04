/**

 * UI-Router Extras: Sticky states, Future States, Deep State Redirect, Transition promise
 * Module: previous
 * @version 0.0.13
 * @link http://christopherthielen.github.io/ui-router-extras/
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

(function(e,t){e.module("ct.ui.router.extras.previous",["ct.ui.router.extras.core","ct.ui.router.extras.transition"]).service("$previousState",["$rootScope","$state",function(e,n){var r=null,i=null,s={};e.$on("$transitionStart",function(e,t){function o(){i=null}function u(){r=i}var n=t.from,s=n.state&&n.state.$$state&&n.state.$$state();s&&s.navigable&&(i=r,r=t.from),t.promise.then(o).catch(u)});var o={get:function(e){return e?s[e]:r},go:function(e,t){var r=o.get(e);return n.go(r.state,r.params,t)},memo:function(e,t,i){s[e]=r||{state:n.get(t),params:i}},forget:function(e){e?delete s[e]:r=t}};return o}]),e.module("ct.ui.router.extras.previous").run(["$previousState",function(e){}])})(angular)