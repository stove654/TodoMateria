'use strict';

/**
 * @ngdoc service
 * @name resAdminApp.MediaFactory
 * @description
 * # MediaFactory
 * Factory in the resAdminApp.
 */
angular.module('resAdminApp')
  .factory('MediaFactory', function (AppConfig, $http) {
    var api = {};

    api.getAllImages = function () {
      return $http.get(AppConfig.baseUrl + 'api/images')
        .then(function(data) {
          return data.data;
        });
    };



    return api;
  });
