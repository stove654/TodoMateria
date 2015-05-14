'use strict';

/**
 * @ngdoc function
 * @name resAdminApp.controller:MenuCtrl
 * @description
 * # MenuCtrl
 * Controller of the resAdminApp
 */
angular.module('resAdminApp')
  .controller('MenuCtrl', function ($scope, $modal, MenuFactory) {

    $scope.addNewCategory = false;
    $scope.category = {};



    function _init() {
      MenuFactory.getAllFoods().then(function (data) {
        $scope.allFoods = data;
      });
    }
    _init();

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

    $scope.createCategory = function () {
      MenuFactory.createCategory(angular.copy($scope.category))
        .then(function(data) {
          $scope.allFoods.push(data);
          $scope.addNewCategory = false;
          $scope.category = {};
        }, function(error) {
          $scope.addNewCategory = false;
        });
    }
  });
