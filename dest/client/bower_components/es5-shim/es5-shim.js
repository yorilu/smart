/*!
 * https://github.com/es-shims/es5-shim
 * @license es5-shim Copyright 2009-2014 by contributors, MIT License
 * see https://github.com/es-shims/es5-shim/blob/master/LICENSE
 */

(function(e,t){typeof define=="function"&&define.amd?define([],t):typeof exports=="object"?module.exports=t():e.returnExports=t()})(this,function(){function u(){}function F(e){return e=+e,e!==e?e=0:e!==0&&e!==1/0&&e!==-1/0&&(e=(e>0||-1)*Math.floor(Math.abs(e))),e}function I(e){var t=typeof e;return e===null||t==="undefined"||t==="boolean"||t==="number"||t==="string"}function q(e){var t,n,r;if(I(e))return e;n=e.valueOf;if(typeof n=="function"){t=n.call(e);if(I(t))return t}r=e.toString;if(typeof r=="function"){t=r.call(e);if(I(t))return t}throw new TypeError}var e=Function.prototype.call,t=Array.prototype,n=Object.prototype,r=t.slice,i=Array.prototype.splice,s=Array.prototype.push,o=Array.prototype.unshift;Function.prototype.bind||(Function.prototype.bind=function(t){var n=this;if(typeof n!="function")throw new TypeError("Function.prototype.bind called on incompatible "+n);var i=r.call(arguments,1),s=function(){if(this instanceof l){var e=n.apply(this,i.concat(r.call(arguments)));return Object(e)===e?e:this}return n.apply(t,i.concat(r.call(arguments)))},o=Math.max(0,n.length-i.length),a=[];for(var f=0;f<o;f++)a.push("$"+f);var l=Function("binder","return function("+a.join(",")+"){return binder.apply(this,arguments)}")(s);return n.prototype&&(u.prototype=n.prototype,l.prototype=new u,u.prototype=null),l});var a=e.bind(n.hasOwnProperty),f=e.bind(n.toString),l,c,h,p,d;if(d=a(n,"__defineGetter__"))l=e.bind(n.__defineGetter__),c=e.bind(n.__defineSetter__),h=e.bind(n.__lookupGetter__),p=e.bind(n.__lookupSetter__);[1,2].splice(0).length!=2&&(!function(){function e(e){var t=[];while(e--)t.unshift(e);return t}var t=[],n;t.splice.bind(t,0,0).apply(null,e(20)),t.splice.bind(t,0,0).apply(null,e(26)),n=t.length,t.splice(5,0,"XXX");if(n+1===t.length)return!0}()?Array.prototype.splice=function(e,t){var n,u=r.call(arguments,2),a=u.length;if(!arguments.length)return[];e===void 0&&(e=0),t===void 0&&(t=this.length-e);if(a>0){if(t<=0){if(e===this.length)return s.apply(this,u),[];if(e===0)return o.apply(this,u),[]}return n=r.call(this,e,e+t),u.push.apply(u,r.call(this,e+t,this.length)),u.unshift.apply(u,r.call(this,0,e)),u.unshift(0,this.length),i.apply(this,u),n}return i.call(this,e,t)}:Array.prototype.splice=function(e,t){return arguments.length?i.apply(this,[e===void 0?0:e,t===void 0?this.length-e:t].concat(r.call(arguments,2))):[]}),[].unshift(0)!=1&&(Array.prototype.unshift=function(){return o.apply(this,arguments),this.length}),Array.isArray||(Array.isArray=function(t){return f(t)==="[object Array]"});var v=Object("a"),m=v[0]!="a"||!(0 in v),g=function(t){var n=!0;return t&&t.call("foo",function(e,t,r){typeof r!="object"&&(n=!1)}),!!t&&n};if(!Array.prototype.forEach||!g(Array.prototype.forEach))Array.prototype.forEach=function(t){var n=R(this),r=m&&f(this)==="[object String]"?this.split(""):n,i=arguments[1],s=-1,o=r.length>>>0;if(f(t)!="[object Function]")throw new TypeError;while(++s<o)s in r&&t.call(i,r[s],s,n)};if(!Array.prototype.map||!g(Array.prototype.map))Array.prototype.map=function(t){var n=R(this),r=m&&f(this)==="[object String]"?this.split(""):n,i=r.length>>>0,s=Array(i),o=arguments[1];if(f(t)!="[object Function]")throw new TypeError(t+" is not a function");for(var u=0;u<i;u++)u in r&&(s[u]=t.call(o,r[u],u,n));return s};if(!Array.prototype.filter||!g(Array.prototype.filter))Array.prototype.filter=function(t){var n=R(this),r=m&&f(this)==="[object String]"?this.split(""):n,i=r.length>>>0,s=[],o,u=arguments[1];if(f(t)!="[object Function]")throw new TypeError(t+" is not a function");for(var a=0;a<i;a++)a in r&&(o=r[a],t.call(u,o,a,n)&&s.push(o));return s};if(!Array.prototype.every||!g(Array.prototype.every))Array.prototype.every=function(t){var n=R(this),r=m&&f(this)==="[object String]"?this.split(""):n,i=r.length>>>0,s=arguments[1];if(f(t)!="[object Function]")throw new TypeError(t+" is not a function");for(var o=0;o<i;o++)if(o in r&&!t.call(s,r[o],o,n))return!1;return!0};if(!Array.prototype.some||!g(Array.prototype.some))Array.prototype.some=function(t){var n=R(this),r=m&&f(this)==="[object String]"?this.split(""):n,i=r.length>>>0,s=arguments[1];if(f(t)!="[object Function]")throw new TypeError(t+" is not a function");for(var o=0;o<i;o++)if(o in r&&t.call(s,r[o],o,n))return!0;return!1};var y=!1;Array.prototype.reduce&&(y=typeof Array.prototype.reduce.call("a",function(e,t,n,r){return r})=="object");if(!Array.prototype.reduce||!y)Array.prototype.reduce=function(t){var n=R(this),r=m&&f(this)==="[object String]"?this.split(""):n,i=r.length>>>0;if(f(t)!="[object Function]")throw new TypeError(t+" is not a function");if(!i&&arguments.length===1)throw new TypeError("reduce of empty array with no initial value");var s=0,o;if(arguments.length>=2)o=arguments[1];else do{if(s in r){o=r[s++];break}if(++s>=i)throw new TypeError("reduce of empty array with no initial value")}while(!0);for(;s<i;s++)s in r&&(o=t.call(void 0,o,r[s],s,n));return o};Array.prototype.reduceRight||(Array.prototype.reduceRight=function(t){var n=R(this),r=m&&f(this)==="[object String]"?this.split(""):n,i=r.length>>>0;if(f(t)!="[object Function]")throw new TypeError(t+" is not a function");if(!i&&arguments.length===1)throw new TypeError("reduceRight of empty array with no initial value");var s,o=i-1;if(arguments.length>=2)s=arguments[1];else do{if(o in r){s=r[o--];break}if(--o<0)throw new TypeError("reduceRight of empty array with no initial value")}while(!0);if(o<0)return s;do o in this&&(s=t.call(void 0,s,r[o],o,n));while(o--);return s});if(!Array.prototype.indexOf||[0,1].indexOf(1,2)!=-1)Array.prototype.indexOf=function(t){var n=m&&f(this)==="[object String]"?this.split(""):R(this),r=n.length>>>0;if(!r)return-1;var i=0;arguments.length>1&&(i=F(arguments[1])),i=i>=0?i:Math.max(0,r+i);for(;i<r;i++)if(i in n&&n[i]===t)return i;return-1};if(!Array.prototype.lastIndexOf||[0,1].lastIndexOf(0,-3)!=-1)Array.prototype.lastIndexOf=function(t){var n=m&&f(this)==="[object String]"?this.split(""):R(this),r=n.length>>>0;if(!r)return-1;var i=r-1;arguments.length>1&&(i=Math.min(i,F(arguments[1]))),i=i>=0?i:r-Math.abs(i);for(;i>=0;i--)if(i in n&&t===n[i])return i;return-1};if(!Object.keys){var b=!{toString:null}.propertyIsEnumerable("toString"),w=function(){}.propertyIsEnumerable("prototype"),E=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],S=E.length,x=function(t){return f(t)==="[object Function]"},T=function(t){var n=f(t),r=n==="[object Arguments]";return r||(r=!Array.isArray(n)&&t!==null&&typeof t=="object"&&typeof t.length=="number"&&t.length>=0&&x(t.callee)),r};Object.keys=function(t){var n=x(t),r=T(t),i=t!==null&&typeof t=="object",s=i&&f(t)==="[object String]";if(!i&&!n&&!r)throw new TypeError("Object.keys called on a non-object");var o=[],u=w&&n;if(s||r)for(var l=0;l<t.length;++l)o.push(String(l));else for(var c in t)(!u||c!=="prototype")&&a(t,c)&&o.push(String(c));if(b){var h=t.constructor,p=h&&h.prototype===t;for(var d=0;d<S;d++){var v=E[d];(!p||v!=="constructor")&&a(t,v)&&o.push(v)}}return o}}var N=-621987552e5,C="-000001";if(!Date.prototype.toISOString||(new Date(N)).toISOString().indexOf(C)===-1)Date.prototype.toISOString=function(){var t,n,r,i,s;if(!isFinite(this))throw new RangeError("Date.prototype.toISOString called on non-finite value.");i=this.getUTCFullYear(),s=this.getUTCMonth(),i+=Math.floor(s/12),s=(s%12+12)%12,t=[s+1,this.getUTCDate(),this.getUTCHours(),this.getUTCMinutes(),this.getUTCSeconds()],i=(i<0?"-":i>9999?"+":"")+("00000"+Math.abs(i)).slice(0<=i&&i<=9999?-4:-6),n=t.length;while(n--)r=t[n],r<10&&(t[n]="0"+r);return i+"-"+t.slice(0,2).join("-")+"T"+t.slice(2).join(":")+"."+("000"+this.getUTCMilliseconds()).slice(-3)+"Z"};var k=!1;try{k=Date.prototype.toJSON&&(new Date(NaN)).toJSON()===null&&(new Date(N)).toJSON().indexOf(C)!==-1&&Date.prototype.toJSON.call({toISOString:function(){return!0}})}catch(L){}k||(Date.prototype.toJSON=function(t){var n=Object(this),r=q(n),i;if(typeof r=="number"&&!isFinite(r))return null;i=n.toISOString;if(typeof i!="function")throw new TypeError("toISOString property is not callable");return i.call(n)});var A=Date.parse("+033658-09-27T01:46:40.000Z")===1e15,O=!isNaN(Date.parse("2012-04-04T24:00:00.500Z"))||!isNaN(Date.parse("2012-11-31T23:59:59.000Z")),M=isNaN(Date.parse("2000-01-01T00:00:00.000Z"));if(!Date.parse||M||O||!A)Date=function(e){function t(n,r,i,s,o,u,a){var f=arguments.length;if(this instanceof e){var l=f===1&&String(n)===n?new e(t.parse(n)):f>=7?new e(n,r,i,s,o,u,a):f>=6?new e(n,r,i,s,o,u):f>=5?new e(n,r,i,s,o):f>=4?new e(n,r,i,s):f>=3?new e(n,r,i):f>=2?new e(n,r):f>=1?new e(n):new e;return l.constructor=t,l}return e.apply(this,arguments)}function i(e,t){var n=t>1?1:0;return r[t]+Math.floor((e-1969+n)/4)-Math.floor((e-1901+n)/100)+Math.floor((e-1601+n)/400)+365*(e-1970)}function s(t){return Number(new e(1970,0,1,0,0,0,t))}var n=new RegExp("^(\\d{4}|[+-]\\d{6})(?:-(\\d{2})(?:-(\\d{2})(?:T(\\d{2}):(\\d{2})(?::(\\d{2})(?:(\\.\\d{1,}))?)?(Z|(?:([-+])(\\d{2}):(\\d{2})))?)?)?)?$"),r=[0,31,59,90,120,151,181,212,243,273,304,334,365];for(var o in e)t[o]=e[o];return t.now=e.now,t.UTC=e.UTC,t.prototype=e.prototype,t.prototype.constructor=t,t.parse=function(r){var o=n.exec(r);if(o){var u=Number(o[1]),a=Number(o[2]||1)-1,f=Number(o[3]||1)-1,l=Number(o[4]||0),c=Number(o[5]||0),h=Number(o[6]||0),p=Math.floor(Number(o[7]||0)*1e3),d=Boolean(o[4]&&!o[8]),v=o[9]==="-"?1:-1,m=Number(o[10]||0),g=Number(o[11]||0),y;if(l<(c>0||h>0||p>0?24:25)&&c<60&&h<60&&p<1e3&&a>-1&&a<12&&m<24&&g<60&&f>-1&&f<i(u,a+1)-i(u,a)){y=((i(u,a)+f)*24+l+m*v)*60,y=((y+c+g*v)*60+h)*1e3+p,d&&(y=s(y));if(-864e13<=y&&y<=864e13)return y}return NaN}return e.parse.apply(this,arguments)},t}(Date);Date.now||(Date.now=function(){return(new Date).getTime()}),(!Number.prototype.toFixed||8e-5.toFixed(3)!=="0.000"||.9.toFixed(0)==="0"||1.255.toFixed(2)!=="1.25"||0xde0b6b3a7640080.toFixed(0)!=="1000000000000000128")&&function(){function i(r,i){var s=-1;while(++s<t)i+=r*n[s],n[s]=i%e,i=Math.floor(i/e)}function s(r){var i=t,s=0;while(--i>=0)s+=n[i],n[i]=Math.floor(s/r),s=s%r*e}function o(){var e=t,r="";while(--e>=0)if(r!==""||e===0||n[e]!==0){var i=String(n[e]);r===""?r=i:r+="0000000".slice(0,7-i.length)+i}return r}function u(e,t,n){return t===0?n:t%2===1?u(e,t-1,n*e):u(e*e,t/2,n)}function a(e){var t=0;while(e>=4096)t+=12,e/=4096;while(e>=2)t+=1,e/=2;return t}var e,t,n,r;e=1e7,t=6,n=[0,0,0,0,0,0],Number.prototype.toFixed=function(t){var n,r,f,l,c,h,p,d;n=Number(t),n=n!==n?0:Math.floor(n);if(n<0||n>20)throw new RangeError("Number.toFixed called with invalid number of decimals");r=Number(this);if(r!==r)return"NaN";if(r<=-1e21||r>=1e21)return String(r);f="",r<0&&(f="-",r=-r),l="0";if(r>1e-21){c=a(r*u(2,69,1))-69,h=c<0?r*u(2,-c,1):r/u(2,c,1),h*=4503599627370496,c=52-c;if(c>0){i(0,h),p=n;while(p>=7)i(1e7,0),p-=7;i(u(10,p,1),0),p=c-1;while(p>=23)s(1<<23),p-=23;s(1<<p),i(1,1),s(2),l=o()}else i(0,h),i(1<<-c,0),l=o()+"0.00000000000000000000".slice(2,2+n)}return n>0?(d=l.length,d<=n?l=f+"0.0000000000000000000".slice(0,n-d+2)+l:l=f+l.slice(0,d-n)+"."+l.slice(d-n)):l=f+l,l}}();var _=String.prototype.split;"ab".split(/(?:ab)*/).length!==2||".".split(/(.?)(.?)/).length!==4||"tesst".split(/(s)*/)[1]==="t"||"".split(/.?/).length||".".split(/()()/).length>1?function(){var e=/()??/.exec("")[1]===void 0;String.prototype.split=function(t,n){var r=this;if(t===void 0&&n===0)return[];if(Object.prototype.toString.call(t)!=="[object RegExp]")return _.apply(this,arguments);var i=[],s=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.extended?"x":"")+(t.sticky?"y":""),o=0,u,a,f,l;t=new RegExp(t.source,s+"g"),r+="",e||(u=new RegExp("^"+t.source+"$(?!\\s)",s)),n=n===void 0?-1>>>0:n>>>0;while(a=t.exec(r)){f=a.index+a[0].length;if(f>o){i.push(r.slice(o,a.index)),!e&&a.length>1&&a[0].replace(u,function(){for(var e=1;e<arguments.length-2;e++)arguments[e]===void 0&&(a[e]=void 0)}),a.length>1&&a.index<r.length&&Array.prototype.push.apply(i,a.slice(1)),l=a[0].length,o=f;if(i.length>=n)break}t.lastIndex===a.index&&t.lastIndex++}return o===r.length?(l||!t.test(""))&&i.push(""):i.push(r.slice(o)),i.length>n?i.slice(0,n):i}}():"0".split(void 0,0).length&&(String.prototype.split=function(t,n){return t===void 0&&n===0?[]:_.apply(this,arguments)});if("".substr&&"0b".substr(-1)!=="b"){var D=String.prototype.substr;String.prototype.substr=function(t,n){return D.call(this,t<0?(t=this.length+t)<0?0:t:t,n)}}var P="	\n\f\r   ᠎             　\u2028\u2029﻿",H="​";if(!String.prototype.trim||P.trim()||!H.trim()){P="["+P+"]";var B=new RegExp("^"+P+P+"*"),j=new RegExp(P+P+"*$");String.prototype.trim=function(){if(this===void 0||this===null)throw new TypeError("can't convert "+this+" to object");return String(this).replace(B,"").replace(j,"")}}if(parseInt(P+"08")!==8||parseInt(P+"0x16")!==22)parseInt=function(e){var t=/^0[xX]/;return function(r,i){return r=String(r).trim(),Number(i)||(i=t.test(r)?16:10),e(r,i)}}(parseInt);var R=function(e){if(e==null)throw new TypeError("can't convert "+e+" to object");return Object(e)}})