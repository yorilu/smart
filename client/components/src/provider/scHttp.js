/**
 * Created by anders on 15/4/13.
 */
'use strict';
/**
 * @ngdoc object
 * @name smartCourtLib.scHttpProvider
 * @description 注入不同环境下服务器地址
 */
angular.module('smartCourtLib').provider('scHttp', [function () {

      var baseUrl = "http://120.26.44.110:8080/smart-api/";

      /**
       * @ngdoc function
       * @name smartCourtLib.scHttpProvider#setBaseUrl
       * @param {string} url api基础url
       * @description 设置restful 服务的基准url
       * @methodOf smartCourtLib.scHttpProvider
       * @example
       * <pre>
       *     scHttpProvider.setBaseUrl('http://test.com/api');
       * </pre>
       */
      this.setBaseUrl = function (url) {
        if (url) {
          baseUrl = url;
        }
      };

      this.$get = ['$http', '$q','$cacheFactory',
        function ($http, $q,$cacheFactory) {

          /**
           * @ngdoc service
           * @name smartCourtLib.scHttp
           * @description
           *  封装$http,用以访问restful接口的基类，退服务端返回的错误报文也做了处理
           *
           *  ##用法
           *
           *  <pre>
           *  var city =  angular.extend({}, scHttp, {
           *   url: 'getCityList',   //必选，api 接口
           *   param: '',            //可选，查询参数
           *   cache: true           //可选，是否使用缓存，默认为false
           *  });
           *
           *  //get方法
           *  var promise = city.get({cityId:1});
           *  promise.then(function(data){
           *    //成功处理,此时数据只返回数据体
           *  },function(data){
           *    //失败处理,数据包含服务端错误码
           *  })
           *  <pre>
           */
          var baseHttpService = {

            /*
             * @ngdoc property
             * @name smartCourtLib.scHttp#url
             * @methodOf smartCourtLib.scHttp
             * @description restful api接口地址
             */
            url : "",

            /*
             * @ngdoc property
             * @name smartCourtLib.scHttp#param
             * @methodOf smartCourtLib.scHttp
             * @description request 参数
             */
            param : "",

            /*
             * @ngdoc property
             * @name smartCourtLib.scHttp#method
             * @methodOf smartCourtLib.scHttp
             * @description http request 方法,默认为get
             */
            method : 'post',

            /*
             * @ngdoc type
             * @name smartCourtLib.scHttp#usecache
             * @methodOf smartCourtLib.scHttp
             * @description 是否使用换成
             */
            cache : true,


            httpCache: $cacheFactory('httpCache'),

            transFn: function(data) {
              return data?$.param(data):'';
            },
            /**
             * @ngdoc function
             * @name smartCourtLib.scHttp#execute
             * @methodOf smartCourtLib.scHttp
             * @param {String} data 请求参数参数
             * @param {String=} method 请求方法
             * @param {config=} config 请求配置
             * @returns {promise} promise
             */
            execute : function (data, method, config) {

              var self = this;
              
              if(typeof data != 'undefined'){
                data.clientId = 'h5'; 
              }
              
              this.param = data;
              var defer = $q.defer(),
              method = method || this.method || 'post',
              cfg = config ? config : {
                cache : !!this.cache
               // cache : $cacheFactory(this.url + angular.toJson(data))
              };

              var replace = this.url.split("-")[1].toLowerCase() + "." + this.url.split("-")[0].toLowerCase();
              var tempUrl = baseUrl.replace("{{replace}}", replace);

              var args = [tempUrl + this.url];

              var key = this.url + angular.toJson(data),
                result = this.httpCache.get(key);
              if(result){
                //返回一个cache副本，防止使用脏数据
                var dest = angular.isArray(result)?[]:{}
                angular.copy(result,dest);
                defer.resolve(dest);
                return defer.promise;
              }

              if (method == 'post' || method == 'put' || method == 'patch') {
                //cfg.transformRequest = self.transFn;
                args.push(data, cfg);
              } else {
                cfg.params = data;
                args.push(cfg);
              }

              // $http[method](baseUrl + this.url, data, cfg)
              $http[method].apply($http, args).success(function (data, status, headers, config) {
                if (data.code != 0) {
                  defer.reject(data.code);
                } else {
                  var dest = {};
                  if(angular.isArray(data.data)){
                    dest = [];
                  }
                  self.httpCache.put(key,angular.copy(data.data,dest));
                  defer.resolve(data.data);
                }
              }).error(function (data, status, headers, config) {
                defer.reject(data.code);
              });

              return defer.promise;
            }
          };

          /**
           * @ngdoc function
           * @name smartCourtLib.scHttp#get
           * @methodOf smartCourtLib.scHttp
           * @param {String} data 请求参数参数
           * @param {config=} config 请求配置
           * @returns {promise} promise
           */

          /**
           * @ngdoc function
           * @name smartCourtLib.scHttp#delete
           * @methodOf smartCourtLib.scHttp
           * @param {String} data 请求参数参数
           * @param {config=} config 请求配置
           * @returns {promise} promise
           */

          /**
           * @ngdoc function
           * @name smartCourtLib.scHttp#jsonp
           * @methodOf smartCourtLib.scHttp
           * @param {String} data 请求参数参数
           * @param {config=} config 请求配置
           * @returns {promise} promise
           */

          /**
           * @ngdoc function
           * @name smartCourtLib.scHttp#head
           * @methodOf smartCourtLib.scHttp
           * @param {String} data 请求参数参数
           * @param {config=} config 请求配置
           * @returns {promise} promise
           */

          /**
           * @ngdoc function
           * @name smartCourtLib.scHttp#post
           * @methodOf smartCourtLib.scHttp
           * @param {String} data 请求参数参数
           * @param {config=} config 请求配置
           * @returns {promise} promise
           */

          /**
           * @ngdoc function
           * @name smartCourtLib.scHttp#put
           * @methodOf smartCourtLib.scHttp
           * @param {String} data 请求参数参数
           * @param {config=} config 请求配置
           * @returns {promise} promise
           */

          /**
           * @ngdoc function
           * @name smartCourtLib.scHttp#patch
           * @methodOf smartCourtLib.scHttp
           * @param {String} data 请求参数参数
           * @param {config=} config 请求配置
           * @returns {promise} promise
           */
          //封装原生方法
          var methods = ['get', 'delete', 'head', 'jsonp', 'post', 'put', 'patch'];
          angular.forEach(methods,
            function (value, key) {
            baseHttpService[value] = function (data, config) {
              // arguments.
              //var args = Array.prototype.slice.call(arguments);
              //return this.execute.apply(this,args);
              return this.execute(data, value, config);
            }
          })

          return baseHttpService;
        }
      ]
    }
  ])
