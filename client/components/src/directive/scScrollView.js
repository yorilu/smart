 /**
 * @ngdoc directive
 * @name scScrolView
 * @description
 *
 * template:
 * <sc-scrollview class="time-line" triggerheight=100 firetop="timeline.update.prev" firebottom="timeline.update.next">
 * event:
 * you can receive your event in your control eg:  $scope.$on('timeline.update.prev', function(event){
 *												    	// your code.
 *												   });
 * @param  triggerheight //is a distance(px) that you want to trigger a event;
 * @param firetop / firetop & firebotom is your the name of event that be triggered.
 * @param firebottom
 */
angular.module('smartCourtLib').directive('scScrollview', function () {
  return {
    restrict : 'E',
    replace : true,
    transclude : true,
    template : '<div ng-transclude></div>',
    link : function ($scope, elem, attr) {
      angular.element(elem[0]).on("scroll", function (event) {
        var target = event.srcElement || event.target;
        triggerheight = attr.triggerheight || 20;
        if (attr.firetop && target.scrollTop < triggerheight) {
          console.log("fire scroll top evnet");
          $scope.$broadcast(attr.firetop);
        } else if (attr.firebottom && target.scrollTop >= target.scrollHeight - target.offsetHeight - triggerheight) {
          console.log("fire scroll bottom evnet");
          $scope.$broadcast(attr.firebottom);
        }
      })
    }
  };
});
