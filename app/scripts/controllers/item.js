'use strict';

/**
 * @ngdoc function
 * @name resAdminApp.controller:ItemCtrl
 * @description
 * # ItemCtrl
 * Controller of the resAdminApp
 */
angular.module('resAdminApp')
  .controller('ItemCtrl', function ($scope, $state, $modal, ItemFactory, $stateParams) {

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
      if ($stateParams.Id != 'new-food') {
        ItemFactory.getFood($stateParams.Id).then(function (data) {
          formatItem(data);
          $scope.item = data;
        });
      }
    }
    _init();

    function formatItem(item) {
      for (var i = 0; i < $scope.categories.length; i++) {
        if (item.foodCategoryId == $scope.categories[i]._id) {
          $scope.categoryNumber = $scope.categories[i];
          break;
        }
      }
    }


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
      if ($stateParams.Id == 'new-food') {
        ItemFactory.createFood(angular.copy($scope.item))
          .then(function(data) {
            $scope.goMenu();
          }, function(error) {
          });
      } else {
        ItemFactory.updateFood(angular.copy($scope.item))
          .then(function(data) {
            $scope.goMenu();
          }, function(error) {
          });
      }

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
    };

    $scope.saveAndContinue = function () {
      ItemFactory.createFood(angular.copy($scope.item))
        .then(function(data) {
          $scope.resetItem();
        }, function(error) {
        });
    };

    $scope.resetItem = function () {
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
    }

  });
