var directive={};directive.dropdownToggle=["$document","$location","$window",function(e,t,n){var r=null,i;return{restrict:"C",link:function(n,s,o){n.$watch(function(){return t.path()},function(){i&&i()}),s.parent().on("click",function(e){i&&i()}),s.on("click",function(t){t.preventDefault(),t.stopPropagation();var n=!1;r&&(n=r===s,i()),n||(s.parent().addClass("open"),r=s,i=function(t){t&&t.preventDefault(),t&&t.stopPropagation(),e.off("click",i),s.parent().removeClass("open"),i=null,r=null},e.on("click",i))})}}}],directive.syntax=function(){return{restrict:"A",link:function(e,t,n){function r(e,t,n,r){return'<a href="'+n+'" class="btn syntax-'+e+'" target="_blank" rel="nofollow">'+'<span class="'+r+'"></span> '+t+"</a>"}var i="",s={github:{text:"View on Github",key:"syntaxGithub",icon:"icon-github"},plunkr:{text:"View on Plunkr",key:"syntaxPlunkr",icon:"icon-arrow-down"},jsfiddle:{text:"View on JSFiddle",key:"syntaxFiddle",icon:"icon-cloud"}};for(var o in s){var u=s[o],a=n[u.key];a&&(i+=r(o,u.text,a,u.icon))}var f=document.createElement("nav");f.className="syntax-links",f.innerHTML=i;var l=t[0],c=l.parentNode;c.insertBefore(f,l)}}},directive.tabbable=function(){return{restrict:"C",compile:function(e){var t=angular.element('<ul class="nav nav-tabs"></ul>'),n=angular.element('<div class="tab-content"></div>');n.append(e.contents()),e.append(t).append(n)},controller:["$scope","$element",function(e,t){var n=t.contents().eq(0),r=t.controller("ngModel")||{},i=[],s;r.$render=function(){var e=this.$viewValue;if(s?s.value!=e:e){s&&(s.paneElement.removeClass("active"),s.tabElement.removeClass("active"),s=null);if(e){for(var t=0,n=i.length;t<n;t++)if(e==i[t].value){s=i[t];break}s&&(s.paneElement.addClass("active"),s.tabElement.addClass("active"))}}},this.addPane=function(t,o){function l(){f.title=o.title,f.value=o.value||o.title,!r.$setViewValue&&(!r.$viewValue||f==s)&&(r.$viewValue=f.value),r.$render()}var u=angular.element("<li><a href></a></li>"),a=u.find("a"),f={paneElement:t,paneAttrs:o,tabElement:u};return i.push(f),o.$observe("value",l)(),o.$observe("title",function(){l(),a.text(f.title)})(),n.append(u),u.on("click",function(t){t.preventDefault(),t.stopPropagation(),r.$setViewValue?e.$apply(function(){r.$setViewValue(f.value),r.$render()}):(r.$viewValue=f.value,r.$render())}),function(){f.tabElement.remove();for(var e=0,t=i.length;e<t;e++)f==i[e]&&i.splice(e,1)}}}]}},directive.table=function(){return{restrict:"E",link:function(e,t,n){n["class"]||t.addClass("table table-bordered table-striped code-table")}}};var popoverElement=function(){var e={init:function(){this.element=angular.element('<div class="popover popover-incode top"><div class="arrow"></div><div class="popover-inner"><div class="popover-title"><code></code></div><div class="popover-content"></div></div></div>'),this.node=this.element[0],this.element.css({display:"block",position:"absolute"}),angular.element(document.body).append(this.element);var e=this.element.children()[1];this.titleElement=angular.element(e.childNodes[0].firstChild),this.contentElement=angular.element(e.childNodes[1]),this.element.bind("click",function(e){e.preventDefault(),e.stopPropagation()});var t=this;angular.element(document.body).bind("click",function(e){t.visible()&&t.hide()})},show:function(e,t){this.element.addClass("visible"),this.position(e||0,t||0)},hide:function(){this.element.removeClass("visible"),this.position(-9999,-9999)},visible:function(){return this.position().y>=0},isSituatedAt:function(e){return this.besideElement?e[0]==this.besideElement[0]:!1},title:function(e){return this.titleElement.html(e)},content:function(e){return e&&e.length>0&&(e=marked(e)),this.contentElement.html(e)},positionArrow:function(e){this.node.className="popover "+e},positionAway:function(){this.besideElement=null,this.hide()},positionBeside:function(e){this.besideElement=e;var t=e[0],n=t.offsetLeft,r=t.offsetTop;n-=30,r-=this.node.offsetHeight+10,this.show(n,r)},position:function(e,t){if(e==null||t==null)return{x:this.node.offsetLeft,y:this.node.offsetTop};this.element.css("left",e+"px"),this.element.css("top",t+"px")}};return e.init(),e.hide(),e};directive.popover=["popoverElement",function(e){return{restrict:"A",priority:500,link:function(t,n,r){n.bind("click",function(t){t.preventDefault(),t.stopPropagation(),e.isSituatedAt(n)&&e.visible()?(e.title(""),e.content(""),e.positionAway()):(e.title(r.title),e.content(r.content),e.positionBeside(n))})}}}],directive.tabPane=function(){return{require:"^tabbable",restrict:"C",link:function(e,t,n,r){t.on("$remove",r.addPane(t,n))}}},directive.foldout=["$http","$animate","$window",function(e,t,n){return{restrict:"A",priority:500,link:function(r,i,s){var o,u,a=s.url;/\/build\//.test(n.location.href)&&(a="/build/docs"+a),i.bind("click",function(){r.$apply(function(){if(!o){if(u)return;u=!0;var n=i.parent();o=angular.element('<div class="foldout">loading...</div>'),t.enter(o,null,n),e.get(a,{cache:!0}).success(function(e){u=!1,e='<div class="foldout-inner"><div calss="foldout-arrow"></div>'+e+"</div>",o.html(e),o.css("display")=="block"&&(o.css("display","none"),t.addClass(o,"ng-hide"))})}else o.hasClass("ng-hide")?t.removeClass(o,"ng-hide"):t.addClass(o,"ng-hide")})})}}}],angular.module("bootstrap",[]).directive(directive).factory("popoverElement",popoverElement).run(function(){marked.setOptions({gfm:!0,tables:!0})})