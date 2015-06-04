/* ========================================================================
 * Ratchet: popovers.js v2.0.2
 * http://goratchet.com/components#popovers
 * ========================================================================
 * Copyright 2014 Connor Sears
 * Licensed under MIT (https://github.com/twbs/ratchet/blob/master/LICENSE)
 * ======================================================================== */

!function(){var e,t=function(e){var t,n=document.querySelectorAll("a");for(;e&&e!==document;e=e.parentNode)for(t=n.length;t--;)if(n[t]===e)return e},n=function(){e.style.display="none",e.removeEventListener("webkitTransitionEnd",n)},r=function(){var t=document.createElement("div");return t.classList.add("backdrop"),t.addEventListener("touchend",function(){e.addEventListener("webkitTransitionEnd",n),e.classList.remove("visible"),e.parentNode.removeChild(r)}),t}(),i=function(n){var r=t(n.target);if(!r||!r.hash||r.hash.indexOf("/")>0)return;try{e=document.querySelector(r.hash)}catch(i){e=null}if(e===null)return;if(!e||!e.classList.contains("popover"))return;return e},s=function(e){var t=i(e);if(!t)return;t.style.display="block",t.offsetHeight,t.classList.add("visible"),t.parentNode.appendChild(r)};window.addEventListener("touchend",s)}()