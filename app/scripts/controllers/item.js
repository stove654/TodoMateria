'use strict';

/**
 * @ngdoc function
 * @name resAdminApp.controller:ItemCtrl
 * @description
 * # ItemCtrl
 * Controller of the resAdminApp
 */
angular.module('resAdminApp')
  .controller('ItemCtrl', function ($scope, $state, $modal) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.fileImage = null;

    $scope.uploading = function () {
      console.log($scope.fileImage)
    };
    $scope.goMenu = function () {
      $state.go('main.menu');
    };

    $scope.openMedia = function (size) {

      var modalInstance = $modal.open({
        animation: true,
        templateUrl: './views/modals/media.html',
        controller: 'MediaCtrl',
        size: size,
        scope: $scope,
        windowClass: 'modal-override'
      });

      modalInstance.result.then(function () {
      }, function () {
      });
    };
  });
