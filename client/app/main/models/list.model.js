/**
 * @ngdoc service
 * @name mainModel
 * @description
 * _Please update the description and dependencies._
 *
 * */
define(['app'], function (app) {
  app.factory('listModel', ['scHttp', function (scHttp) {

        var model = {
          citys : angular.extend({}, scHttp, {
            url : 'Cloud-MD-BaseData/getCityList'
          }),
          stadiumLists : angular.extend({}, scHttp, {
            url : 'Cloud-MD-BaseData/getCityStadiumList'
          })
        };
        return model;
      }
    ]);
});
