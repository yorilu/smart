define(["../core","../core/init","../deferred"],function(e){function n(){document.addEventListener?(document.removeEventListener("DOMContentLoaded",r,!1),window.removeEventListener("load",r,!1)):(document.detachEvent("onreadystatechange",r),window.detachEvent("onload",r))}function r(){if(document.addEventListener||event.type==="load"||document.readyState==="complete")n(),e.ready()}var t;e.fn.ready=function(t){return e.ready.promise().done(t),this},e.extend({isReady:!1,readyWait:1,holdReady:function(t){t?e.readyWait++:e.ready(!0)},ready:function(n){if(n===!0?--e.readyWait:e.isReady)return;if(!document.body)return setTimeout(e.ready);e.isReady=!0;if(n!==!0&&--e.readyWait>0)return;t.resolveWith(document,[e]),e.fn.triggerHandler&&(e(document).triggerHandler("ready"),e(document).off("ready"))}}),e.ready.promise=function(i){if(!t){t=e.Deferred();if(document.readyState==="complete")setTimeout(e.ready);else if(document.addEventListener)document.addEventListener("DOMContentLoaded",r,!1),window.addEventListener("load",r,!1);else{document.attachEvent("onreadystatechange",r),window.attachEvent("onload",r);var s=!1;try{s=window.frameElement==null&&document.documentElement}catch(o){}s&&s.doScroll&&function u(){if(!e.isReady){try{s.doScroll("left")}catch(t){return setTimeout(u,50)}n(),e.ready()}}()}}return t.promise(i)}})