/* ========================================================================
 * Ratchet: segmented-controllers.js v2.0.2
 * http://goratchet.com/components#segmentedControls
 * ========================================================================
 * Copyright 2014 Connor Sears
 * Licensed under MIT (https://github.com/twbs/ratchet/blob/master/LICENSE)
 * ======================================================================== */

!function(){var e=function(e){var t,n=document.querySelectorAll(".segmented-control .control-item");for(;e&&e!==document;e=e.parentNode)for(t=n.length;t--;)if(n[t]===e)return e};window.addEventListener("touchend",function(t){var n,r,i,s=e(t.target),o="active",u="."+o;if(!s)return;n=s.parentNode.querySelector(u),n&&n.classList.remove(o),s.classList.add(o);if(!s.hash)return;i=document.querySelector(s.hash);if(!i)return;r=i.parentNode.querySelectorAll(u);for(var a=0;a<r.length;a++)r[a].classList.remove(o);i.classList.add(o)}),window.addEventListener("click",function(t){e(t.target)&&t.preventDefault()})}()