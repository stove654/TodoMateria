'use strict';

/**
 * @ngdoc function
 * @name resAdminApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the resAdminApp
 */
angular.module('resAdminApp')
  .controller('LoginCtrl', function ($scope, AppConfig, loginService, localStorageService, SessionService, $state) {
    $scope.user = {};

    $scope.login = function () {
      loginService.login(angular.copy($scope.user))
        .then(function(data) {
          if (data.success == true) {
            localStorageService.set('user', data);
            $state.go('main');
          }
        }, function(error) {

        });
    };

  });
