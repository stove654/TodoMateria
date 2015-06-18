'use strict';

/**
 * @ngdoc function
 * @name resAdminApp.controller:MenuCtrl
 * @description
 * # MenuCtrl
 * Controller of the resAdminApp
 */
angular.module('resAdminApp')
  .controller('MenuCtrl', function ($scope, $modal, MenuFactory, $state, ItemFactory, socket, $http) {

    /*$scope.awesomeThings = [];

    $http.get('http://localhost:8080/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      console.log($scope.awesomeThings)

      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      $scope.newThing = 'test real time server';
      $http.post('http://localhost:8080/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('http://localhost:8080/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });*/

    $scope.addNewCategory = false;
    $scope.category = {};



    function _init() {
      MenuFactory.getAllFoods().then(function (data) {
        $scope.allFoods = data.data;
        console.log($scope.allFoods)
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

    $scope.detailFood = function (item) {
      $state.go('main.item', {Id: item._id});
    };

    $scope.createFood = function () {
      $state.go('main.item', {Id: 'new-food'});
    }
  });
