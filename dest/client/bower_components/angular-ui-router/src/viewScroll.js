function $ViewScrollProvider(){var e=!1;this.useAnchorScroll=function(){e=!0},this.$get=["$anchorScroll","$timeout",function(t,n){return e?t:function(e){n(function(){e[0].scrollIntoView()},0,!1)}}]}angular.module("ui.router.state").provider("$uiViewScroll",$ViewScrollProvider)