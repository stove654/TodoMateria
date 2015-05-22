'use strict';

/**
 * @ngdoc function
 * @name resAdminApp.controller:MenuCtrl
 * @description
 * # MenuCtrl
 * Controller of the resAdminApp
 */
angular.module('resAdminApp')
  .controller('MenuCtrl', function ($scope, $modal, MenuFactory, $state) {

    $scope.addNewCategory = false;
    $scope.category = {};



    function _init() {
      MenuFactory.getAllFoods().then(function (data) {
        $scope.allFoods = data;
      });
    }
    _init();

    $scope.createCategory = function () {
      MenuFactory.createCategory(angular.copy($scope.category))
        .then(function(data) {
          $scope.allFoods.push(data);
          $scope.addNewCategory = false;
          $scope.category = {};
        }, function(error) {
          $scope.addNewCategory = false;
        });
    };

    $scope.deleteCategory = function (id, index) {
      MenuFactory.deleteCategory(id)
        .then(function(data) {
          $scope.allFoods.splice(index, 1);
        }, function(error) {
        });
    };

    $scope.createFood = function () {
      $state.go('main.item', {Id: 'new-food'});
    }
  });
