'use strict';

/**
 * @ngdoc service
 * @name resAdminApp.login
 * @description
 * # login
 * Factory in the resAdminApp.
 */
angular.module('resAdminApp')
  .factory('loginService', function (AppConfig, $http) {

    var api = {};

    api.login = function (params) {
      return $http.post(AppConfig.baseUrl + 'authenticate', $.param(params)).then(function(data) {
        return data.data;
      });
    };

    return api;
  });
