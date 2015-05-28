'use strict';

/**
 * @ngdoc service
 * @name resAdminApp.menu
 * @description
 * # menu
 * Factory in the resAdminApp.
 */
angular.module('resAdminApp')
  .factory('ItemFactory', function (AppConfig, $http) {
    var api = {};

    api.getCategory = function () {
      return $http.get(AppConfig.baseUrl + 'api/categories').then(function(data) {
        return data.data;
      });
    };

    api.createFood = function (params) {
      console.log(params);
      return $http.post(AppConfig.baseUrl + 'api/foods', params).then(function(data) {
        return data.data;
      });
    };


    return api;
  });
