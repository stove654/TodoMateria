'use strict';

/**
 * @ngdoc function
 * @name resAdminApp.controller:ItemCtrl
 * @description
 * # ItemCtrl
 * Controller of the resAdminApp
 */
angular.module('resAdminApp')
  .controller('ItemCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
