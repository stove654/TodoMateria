'use strict';

/**
 * @ngdoc service
 * @name resAdminApp.menu
 * @description
 * # TablesFactory
 * TablesFactory in the resAdminApp.
 */
angular.module('resAdminApp')
  .factory('TablesFactory', function (AppConfig, $http) {
    var api = {};

    api.getTables = function () {
      return $http.get(AppConfig.baseUrl + 'api/tables').then(function(data) {
        return data.data;
      });
    };

    api.createTable = function (params) {
      return $http.post(AppConfig.baseUrl + 'api/tables', params).then(function(data) {
        return data.data;
      });
    };

    return api;
  });
