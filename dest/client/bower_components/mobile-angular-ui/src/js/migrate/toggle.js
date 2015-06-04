(function(){var e=angular.module("mobile-angular-ui.migrate.toggle",["mobile-angular-ui.core.sharedState"]);e.directive("toggle",["SharedState",function(e){return{restrict:"A",link:function(t,n,r){var i=r.exclusionGroup,s=r.toggle||"toggle",o=r.bubble!==undefined&&r.bubble!=="false",u=r.activeClass,a=r.inactiveClass,f=r.parentActiveClass,l=r.parentInactiveClass,c=n.parent(),h=r.target;!h&&r.href&&(h=r.href.slice(1));if(!h)throw new Error('Toggle directive requires "target" attribute to be set. If you are using toggleByClass yet be aware that is not supported by migration version of toggle.\nPlease switch to ui-* directives instead.');var p=function(e){e?(f&&c.addClass(f),u&&n.addClass(u),l&&c.removeClass(l),a&&n.removeClass(a)):(f&&c.removeClass(f),u&&n.removeClass(u),l&&c.addClass(l),a&&n.addClass(a))};t.$on("mobile-angular-ui.state.changed."+h,function(e,t){p(t)}),p(e.get("id")),n.on("click tap",function(n){return t.$$phase||t.$apply(function(){s==="on"?e.turnOn(h):s==="off"?e.turnOff(h):e.toggle(h)}),o?!0:(n.preventDefault(),!1)})}}}]),e.directive("toggleable",["SharedState","$rootScope",function(e,t){return{restrict:"A",link:function(n,r,i){var s=i.exclusionGroup,o=i.default==="active",u=i.activeClass,a=i.inactiveClass,f=i.parentActiveClass,l=i.parentInactiveClass,c=r.parent(),h=i.toggleable||i.id;n.$on("mobile-angular-ui.state.changed."+h,function(e,n){n?(f&&c.addClass(f),u&&r.addClass(u),l&&c.removeClass(l),a&&r.removeClass(a)):(f&&c.removeClass(f),u&&r.removeClass(u),l&&c.addClass(l),a&&r.addClass(a)),t.$emit("mobile-angular-ui.toggle.toggled",h,n,s)}),e.initialize(n,h,{defaultValue:o,exclusionGroup:s})}}}]),e.run(["$rootScope","SharedState",function(e,t){e.toggle=function(e,n){n==="on"?t.turnOn(e):n==="off"?t.turnOff(e):t.toggle(e)}}])})()