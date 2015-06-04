/**
 * @ngdoc service
 * @name detailModel
 * @description
 * _Please update the description and dependencies._
 *
 * */
define(['app'], function (app) {
  app.factory('detailModel', ['scHttp', function (scHttp) {
        var model = {
          //城市查询
          getTimeLinePrev : angular.extend({}, scHttp, {
            url : 'Cloud-Video-ClipInfo/getStadiumOverview'
          }),
          getTimeLineNext : angular.extend({}, scHttp, {
            url : 'Cloud-Video-ClipInfo/getStadiumOverview'
          }),
          getCourtList : angular.extend({}, scHttp, {
            url : 'Cloud-MD-BaseData/getCourtList'
          })
        };
        return model;
      }
    ]);
});
