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
        console.log($scope.listImages)
      });
    }
    _init();

    $scope.selectImage = function (item) {
      $scope.imageSelected = item;
    };

    /*$scope.upload = function (files) {
      if (files && files.length) {
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          Upload.upload({
            url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
            fields: {
              'username': $scope.username
            },
            file: file
          }).progress(function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            $scope.log = 'progress: ' + progressPercentage + '% ' +
            evt.config.file.name + '\n' + $scope.log;
          }).success(function (data, status, headers, config) {
            $scope.log = 'file ' + config.file.name + 'uploaded. Response: ' + JSON.stringify(data) + '\n' + $scope.log;
            $scope.$apply();
          });
        }
      }
    };*/
  });
