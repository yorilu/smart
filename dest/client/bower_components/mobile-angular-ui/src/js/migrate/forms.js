(function(){var e=angular.module("mobile-angular-ui.migrate.forms",[]);e.directive("bsFormControl",function(){function i(t){var n="",r="";for(var i=0;i<t.length;i++){var s=t[i];s in e?n+=s+" ":r+=s+" "}return{i:n.trim(),d:r.trim()}}var e={},t=["xs","sm","md","lg"];for(var n=0;n<t.length;n++)for(var r=1;r<=12;r++)e["col-"+t[n]+"-"+r]=!0;return{replace:!0,require:"ngModel",link:function(e,t,n){if(n.labelClass===null||n.labelClass===undefined)n.labelClass="";if(n.id===null||n.id===undefined)n.id=n.ngModel.replace(".","_")+"_input";(t[0].tagName=="SELECT"||(t[0].tagName=="INPUT"||t[0].tagName=="TEXTAREA")&&n.type!="checkbox"&&n.type!="radio")&&t.addClass("form-control");var r=angular.element('<label for="'+n.id+'" class="control-label">'+n.label+"</label>"),s=angular.element('<div class="form-group row"></div>'),o=angular.element('<div class="form-control-wrapper"></div>'),u=i(n.labelClass.split(/\s+/));u.i===""&&r.addClass("col-xs-12"),r.addClass(n.labelClass);var a=i(t[0].className.split(/\s+/));t.removeClass(a.i),o.addClass(a.i),a.i===""&&o.addClass("col-xs-12"),t.wrap(s).wrap(o),t.parent().parent().prepend(r),t.attr("id",n.id),r=s=o=u=a=null}}})})()