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

    api.getAllCategories = function () {
      return $http.get(AppConfig.baseUrl + 'api/categories')
        .then(function(data) {
          return data.data;
        });
    };

    api.getFoodByCategory = function (id) {
      return $http.get(AppConfig.baseUrl + 'api/foods/category/' + id)
        .then(function(data) {
          return data.data;
        });
    };

    api.createCategory = function (params) {
      return $http.post(AppConfig.baseUrl + 'api/categories', params).then(function(data) {
        return data.data;
      });
    };

    api.deleteCategory = function (id) {
      return $http.delete(AppConfig.baseUrl + 'api/categories/' + id).then(function(data) {
        return data.data;
      });
    };

    return api;
  });
