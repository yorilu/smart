define(["../models/list.model"],function(){return["$scope","listModel","$stateParams",function(e,t,n){e.onEnter=function(){function o(t,n){var r=n?n:2;for(var i=t.length-1;i>=0;i--)if(t[i].id==r){t[i].selected=!0;break}e.dataModel={data:t,selectHandler:function(t,n){e.showLoading(),window.scrollTo(0,0),u(t.id),e.model.cityId=t.id}}}function u(n){var r=t.stadiumLists.get({cityId:n});r.then(function(t){e.hideLoading(),e.json=t},function(){e.hideLoading(),e.showErrorPage()})}e.showLoading();var r=e.model.cityId?e.model.cityId:n.cityId?n.cityId:2,i=e.model&&e.model.citylist||[];if(i.length>0)o(i,r),u(r);else{var s=t.citys.get();s.then(function(t){i=t,e.model.citylist=t,o(i,r),u(r)},function(){e.hideLoading(),e.showErrorPage()})}}}]})