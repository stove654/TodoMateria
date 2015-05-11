'use strict';

/**
 * @ngdoc overview
 * @name resAdminApp
 * @description
 * # resAdminApp
 *
 * Main module of the application.
 */
angular
  .module('resAdminApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'ui.router',
    'LocalStorageModule'
  ])
  .run(function ($rootScope, $state, $location, SessionService) {

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {

      var shouldLogin = toState.data !== undefined
        && toState.data.requireLogin
        && !SessionService.isToken().isLoggedIn ;

      // NOT authenticated - wants any private stuff
      if(shouldLogin)
      {
        $state.go('login');
        event.preventDefault();
        return;
      }

      // authenticated (previously) comming not to root main
      if(SessionService.isToken().isLoggedIn)
      {
        var shouldGoToMain = fromState.name === ""
          && toState.name !== "main" ;

        if (shouldGoToMain)
        {
          $state.go('main');
          event.preventDefault();
        }
        return;
      }

    });
  })

  .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .state('main', {
        url: '/main',
        templateUrl: 'views/main.html',
        data : {requireLogin : true }
      })
    ;

    $urlRouterProvider.otherwise('/main');

    // Use x-www-form-urlencoded Content-Type
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
    $httpProvider.defaults.headers.common['Content-Type'] = $httpProvider.defaults.headers.post['Content-Type'];
  })

  .controller('AppCtrl', function ($scope, SessionService) {
    SessionService.isToken();
  });

