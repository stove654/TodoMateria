'use strict';

/**
 * @ngdoc function
 * @name resAdminApp.controller:ItemCtrl
 * @description
 * # ItemCtrl
 * Controller of the resAdminApp
 */
angular.module('resAdminApp')
  .controller('ItemCtrl', function ($scope, $state, $modal, ItemFactory) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.item = {};
    $scope.item.image = './images/no_image.jpg';
    $scope.item.options = [];
    $scope.item.discounts = [];
    $scope.option = {
      price: 0
    };

    $scope.discount = {
      amount: 0,
      percent: 0
    };

    function _init() {
      ItemFactory.getCategory().then(function (data) {
        $scope.categories = data;
      });
    }
    _init();


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

      modalInstance.result.then(function (selectedPic) {
        $scope.item.image = selectedPic;
      }, function () {
      });
    };

    $scope.saveFood = function () {
      ItemFactory.createFood(angular.copy($scope.item))
        .then(function(data) {
          console.log(data);
        }, function(error) {
        });
    };

    $scope.addCategory = function (id) {
      $scope.item.foodCategoryId = id;
    };

    $scope.addFoodOptions = function () {
      $scope.item.options.push(angular.copy($scope.option));
      $scope.option = {
        price: 0
      };
    };

    $scope.deleteFoodDiscounts = function (index) {
      $scope.item.discounts.splice(index, 1);
    };

    $scope.addFoodDiscounts = function () {
      $scope.item.discounts.push(angular.copy($scope.discount));
      $scope.discount = {
        amount: 0,
        percent: 0
      };
    };

    $scope.deleteFoodOptions = function (index) {
      $scope.item.discounts.splice(index, 1);
    }

  });
