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
      return $http.post(AppConfig.baseUrl + 'api/foods', params).then(function(data) {
        return data.data;
      });
    };

    api.updateFood = function (params) {
      console.log(params);
      return $http.put(AppConfig.baseUrl + 'api/foods/' + params._id, params).then(function(data) {
        return data.data;
      });
    };

    api.getFood = function (id) {
      return $http.get(AppConfig.baseUrl + 'api/foods/' + id).then(function(data) {
        return data.data;
      });
    };

    return api;
  });
