/**
 * @ngdoc service
 * @name mainModel
 * @description
 * _Please update the description and dependencies._
 *
 * */
define(['app'], function (app) {
  app.factory('mainModel', ['scHttp', function (scHttp) {

        var model = {
          //精彩视频
          topNVideo : angular.extend({}, scHttp, {
            url : 'Cloud-Video-ClipInfo/getTopNVideo'
          }),

          //获取周围运动场
          nearByStadiums : angular.extend({}, scHttp, {
            url : 'Cloud-MD-BaseData/getNearbyStadium'
          })
        };

        return model;

      }
    ]);
});
