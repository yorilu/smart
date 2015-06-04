define(["../core","../var/rnotwhite","../var/strundefined","../core/access","./support","./val","../selector"],function(e,t,n,r,i){var s,o,u=e.expr.attrHandle,a=/^(?:checked|selected)$/i,f=i.getSetAttribute,l=i.input;e.fn.extend({attr:function(t,n){return r(this,e.attr,t,n,arguments.length>1)},removeAttr:function(t){return this.each(function(){e.removeAttr(this,t)})}}),e.extend({attr:function(t,r,i){var u,a,f=t.nodeType;if(!t||f===3||f===8||f===2)return;if(typeof t.getAttribute===n)return e.prop(t,r,i);if(f!==1||!e.isXMLDoc(t))r=r.toLowerCase(),u=e.attrHooks[r]||(e.expr.match.bool.test(r)?o:s);if(i===undefined)return u&&"get"in u&&(a=u.get(t,r))!==null?a:(a=e.find.attr(t,r),a==null?undefined:a);if(i!==null)return u&&"set"in u&&(a=u.set(t,i,r))!==undefined?a:(t.setAttribute(r,i+""),i);e.removeAttr(t,r)},removeAttr:function(n,r){var i,s,o=0,u=r&&r.match(t);if(u&&n.nodeType===1)while(i=u[o++])s=e.propFix[i]||i,e.expr.match.bool.test(i)?l&&f||!a.test(i)?n[s]=!1:n[e.camelCase("default-"+i)]=n[s]=!1:e.attr(n,i,""),n.removeAttribute(f?i:s)},attrHooks:{type:{set:function(t,n){if(!i.radioValue&&n==="radio"&&e.nodeName(t,"input")){var r=t.value;return t.setAttribute("type",n),r&&(t.value=r),n}}}}}),o={set:function(t,n,r){return n===!1?e.removeAttr(t,r):l&&f||!a.test(r)?t.setAttribute(!f&&e.propFix[r]||r,r):t[e.camelCase("default-"+r)]=t[r]=!0,r}},e.each(e.expr.match.bool.source.match(/\w+/g),function(t,n){var r=u[n]||e.find.attr;u[n]=l&&f||!a.test(n)?function(e,t,n){var i,s;return n||(s=u[t],u[t]=i,i=r(e,t,n)!=null?t.toLowerCase():null,u[t]=s),i}:function(t,n,r){if(!r)return t[e.camelCase("default-"+n)]?n.toLowerCase():null}});if(!l||!f)e.attrHooks.value={set:function(t,n,r){if(!e.nodeName(t,"input"))return s&&s.set(t,n,r);t.defaultValue=n}};f||(s={set:function(e,t,n){var r=e.getAttributeNode(n);r||e.setAttributeNode(r=e.ownerDocument.createAttribute(n)),r.value=t+="";if(n==="value"||t===e.getAttribute(n))return t}},u.id=u.name=u.coords=function(e,t,n){var r;if(!n)return(r=e.getAttributeNode(t))&&r.value!==""?r.value:null},e.valHooks.button={get:function(e,t){var n=e.getAttributeNode(t);if(n&&n.specified)return n.value},set:s.set},e.attrHooks.contenteditable={set:function(e,t,n){s.set(e,t===""?!1:t,n)}},e.each(["width","height"],function(t,n){e.attrHooks[n]={set:function(e,t){if(t==="")return e.setAttribute(n,"auto"),t}}})),i.style||(e.attrHooks.style={get:function(e){return e.style.cssText||undefined},set:function(e,t){return e.style.cssText=t+""}})})