'use strict';

/**
 * @ngdoc service
 * @name resAdminApp.menu
 * @description
 * # TaxDiscountFactory
 * TaxDiscountFactory in the resAdminApp.
 */
angular.module('resAdminApp')
  .factory('TaxDiscountFactory', function (AppConfig, $http) {
    var api = {};

    api.createTax = function (params) {
      return $http.post(AppConfig.baseUrl + 'api/taxes', params).then(function(data) {
        return data.data;
      });
    };

    api.getTaxes = function () {
      return $http.get(AppConfig.baseUrl + 'api/taxes').then(function(data) {
        return data.data;
      });
    };

    api.createDiscount = function (params) {
      return $http.post(AppConfig.baseUrl + 'api/discounts', params).then(function(data) {
        return data.data;
      });
    };

    api.getDiscounts = function () {
      return $http.get(AppConfig.baseUrl + 'api/discounts').then(function(data) {
        return data.data;
      });
    };

    return api;
  });
