define(["./core","./var/rnotwhite"],function(e,t){function r(r){var i=n[r]={};return e.each(r.match(t)||[],function(e,t){i[t]=!0}),i}var n={};return e.Callbacks=function(t){t=typeof t=="string"?n[t]||r(t):e.extend({},t);var i,s,o,u,a,f,l=[],c=!t.once&&[],h=function(e){s=t.memory&&e,o=!0,a=f||0,f=0,u=l.length,i=!0;for(;l&&a<u;a++)if(l[a].apply(e[0],e[1])===!1&&t.stopOnFalse){s=!1;break}i=!1,l&&(c?c.length&&h(c.shift()):s?l=[]:p.disable())},p={add:function(){if(l){var n=l.length;(function r(n){e.each(n,function(n,i){var s=e.type(i);s==="function"?(!t.unique||!p.has(i))&&l.push(i):i&&i.length&&s!=="string"&&r(i)})})(arguments),i?u=l.length:s&&(f=n,h(s))}return this},remove:function(){return l&&e.each(arguments,function(t,n){var r;while((r=e.inArray(n,l,r))>-1)l.splice(r,1),i&&(r<=u&&u--,r<=a&&a--)}),this},has:function(t){return t?e.inArray(t,l)>-1:!!l&&!!l.length},empty:function(){return l=[],u=0,this},disable:function(){return l=c=s=undefined,this},disabled:function(){return!l},lock:function(){return c=undefined,s||p.disable(),this},locked:function(){return!c},fireWith:function(e,t){return l&&(!o||c)&&(t=t||[],t=[e,t.slice?t.slice():t],i?c.push(t):h(t)),this},fire:function(){return p.fireWith(this,arguments),this},fired:function(){return!!o}};return p},e})