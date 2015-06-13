'use strict';

/**
 * @ngdoc function
 * @name resAdminApp.controller:TablesCtrl
 * @description
 * # TablesCtrl
 * Controller of the resAdminApp
 */
angular.module('resAdminApp')
  .controller('TablesCtrl', function ($scope, TablesFactory) {

    $scope.item = {
      name: 'Sector 3',
      tables: []
    };
    $scope.oneTable = {};
    $scope.tables = [$scope.item];

    $scope.createTable = function () {
      if ($scope.oneTable.name.length) {
        $scope.item.tables.push(angular.copy($scope.oneTable));
        TablesFactory.createTable(angular.copy($scope.item)).then(function(data) {
          console.log(data);
        }, function(error) {
        });
      }
    };
    function _init() {
      TablesFactory.getTables().then(function (data) {
        $scope.tables = data;
      });
    }
    _init();
  });
