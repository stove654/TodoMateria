'use strict';

/**
 * @ngdoc function
 * @name resAdminApp.controller:TaxesCtrl
 * @description
 * # TaxesCtrl
 * Controller of the resAdminApp
 */
angular.module('resAdminApp')
  .controller('TaxesCtrl', function ($scope, TaxDiscountFactory) {

    $scope.item = {};
    $scope.item.amount = 0;
    $scope.item.percent = 0;
    $scope.taxes = [];
    $scope.discounts = [];
    $scope.checkAmount = 1;

    $scope.amountCheck = function (id) {
      $scope.checkAmount = id;
      $scope.item.amount = 0;
      $scope.item.percent = 0;
    };

    $scope.createTax = function () {
      if ($scope.item.name.length && $scope.item.amount || $scope.item.percent) {
        TaxDiscountFactory.createTax(angular.copy($scope.item))
          .then(function(data) {
            console.log(data);
          }, function(error) {
          });
      }
    };

    $scope.createDiscount = function () {
      if ($scope.item.name.length && $scope.item.amount || $scope.item.percent) {
        TaxDiscountFactory.createDiscount(angular.copy($scope.item))
          .then(function(data) {
            console.log(data);
          }, function(error) {
          });
      }
    };

    function _init() {
      TaxDiscountFactory.getTaxes().then(function (data) {
        angular.forEach(data, function(value, key) {
          value.amount = parseFloat(value.amount);
          value.percent = parseFloat(value.percent);
        });
        console.log(data)
        $scope.taxes = data;
      });

      TaxDiscountFactory.getDiscounts().then(function (data) {
        angular.forEach(data, function(value, key) {
          value.amount = parseFloat(value.amount);
          value.percent = parseFloat(value.percent);
        });
        console.log(data)
        $scope.discounts = data;
      });

    }
    _init();

  });
