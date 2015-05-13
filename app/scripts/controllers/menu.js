'use strict';

/**
 * @ngdoc function
 * @name resAdminApp.controller:MenuCtrl
 * @description
 * # MenuCtrl
 * Controller of the resAdminApp
 */
angular.module('resAdminApp')
  .controller('MenuCtrl', function ($scope, $modal) {
    $scope.openItem = function () {
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'views/modal/item.html',
        controller: 'ItemCtrl',
        size: 'lg',
        scope: $scope,
        windowClass: 'modal-override'
      });
    };
  });
