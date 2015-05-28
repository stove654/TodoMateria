'use strict';

/**
 * @ngdoc function
 * @name resAdminApp.controller:MediaCtrl
 * @description
 * # MediaCtrl
 * Controller of the resAdminApp
 */
angular.module('resAdminApp')
    .controller('MediaCtrl', function ($scope, $modalInstance, MediaFactory, Upload, AppConfig) {

    $scope.$watch('files', function () {
      $scope.upload($scope.files);
    });

    $scope.upload = function (files) {
      if (files && files.length) {
       for (var i = 0; i < files.length; i++) {
         var file = files[i];
         Upload.upload({
           url: AppConfig.baseUrl + 'api/images',
           file: file
         }).progress(function (data) {
         }).success(function (data, status, headers, config) {
          console.log(data, status, headers, config);
         });
       }
      }
    };

    $scope.listImages = [];
    $scope.imageSelected = null;

    function formatUrlImage(images) {
      for (var i = 0; i < images.length; i++) {
        images[i] = AppConfig.baseUrl + 'static/' + images[i];
      }
    }

    function _init() {
      $scope.isLoading = false;
      MediaFactory.getAllImages().then(function (data) {
        formatUrlImage(data.data);
        $scope.listImages = angular.copy(data.data);
        $scope.isLoading = true;
      });
    }
    _init();

    $scope.selectImage = function (item) {
      $scope.imageSelected = item;
    };

    $scope.addPic = function () {
      $modalInstance.close($scope.imageSelected);
    }
  });
