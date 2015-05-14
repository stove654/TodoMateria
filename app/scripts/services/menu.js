'use strict';

/**
 * @ngdoc service
 * @name resAdminApp.menu
 * @description
 * # menu
 * Factory in the resAdminApp.
 */
angular.module('resAdminApp')
  .factory('MenuFactory', function (AppConfig, $http) {
    var api = {};

    api.getAllFoods = function () {
      return $http.get(AppConfig.baseUrl + 'api/foods/all-foods')
        .then(function(data) {
          return data.data;
        });
    };

    api.createCategory = function (params) {
      return $http.post(AppConfig.baseUrl + 'api/categories', $.param(params)).then(function(data) {
        return data.data;
      });
    };

    return api;
  });
