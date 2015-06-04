/* ========================================================================
 * Ratchet: modals.js v2.0.2
 * http://goratchet.com/components#modals
 * ========================================================================
 * Copyright 2014 Connor Sears
 * Licensed under MIT (https://github.com/twbs/ratchet/blob/master/LICENSE)
 * ======================================================================== */

!function(){var e=function(e){var t,n=document.querySelectorAll("a");for(;e&&e!==document;e=e.parentNode)for(t=n.length;t--;)if(n[t]===e)return e},t=function(t){var n=e(t.target);if(n&&n.hash)return document.querySelector(n.hash)};window.addEventListener("touchend",function(e){var n=t(e);n&&(n&&n.classList.contains("modal")&&n.classList.toggle("active"),e.preventDefault())})}()