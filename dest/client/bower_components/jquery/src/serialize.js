define(["./core","./manipulation/var/rcheckableType","./core/init","./traversing","./attributes/prop"],function(e,t){function u(t,n,i,s){var o;if(e.isArray(n))e.each(n,function(e,n){i||r.test(t)?s(t,n):u(t+"["+(typeof n=="object"?e:"")+"]",n,i,s)});else if(!i&&e.type(n)==="object")for(o in n)u(t+"["+o+"]",n[o],i,s);else s(t,n)}var n=/%20/g,r=/\[\]$/,i=/\r?\n/g,s=/^(?:submit|button|image|reset|file)$/i,o=/^(?:input|select|textarea|keygen)/i;return e.param=function(t,r){var i,s=[],o=function(t,n){n=e.isFunction(n)?n():n==null?"":n,s[s.length]=encodeURIComponent(t)+"="+encodeURIComponent(n)};r===undefined&&(r=e.ajaxSettings&&e.ajaxSettings.traditional);if(e.isArray(t)||t.jquery&&!e.isPlainObject(t))e.each(t,function(){o(this.name,this.value)});else for(i in t)u(i,t[i],r,o);return s.join("&").replace(n,"+")},e.fn.extend({serialize:function(){return e.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var t=e.prop(this,"elements");return t?e.makeArray(t):this}).filter(function(){var n=this.type;return this.name&&!e(this).is(":disabled")&&o.test(this.nodeName)&&!s.test(n)&&(this.checked||!t.test(n))}).map(function(t,n){var r=e(this).val();return r==null?null:e.isArray(r)?e.map(r,function(e){return{name:n.name,value:e.replace(i,"\r\n")}}):{name:n.name,value:r.replace(i,"\r\n")}}).get()}}),e})