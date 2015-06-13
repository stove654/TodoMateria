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
    'LocalStorageModule',
    'ngFileUpload',
    'ui.utils.masks'
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
          && toState.name !== "main.dashboard" ;
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
        data : {requireLogin : true },
        controller: 'MainCtrl'
      })
      .state('main.dashboard', {
        url: '/dashboard',
        templateUrl: 'views/states/dashboard.html',
        data : {requireLogin : true },
        controller: 'DashboardCtrl'
      })
      .state('main.menu', {
        url: '/menu',
        templateUrl: 'views/states/menu.html',
        data : {requireLogin : true },
        controller: 'MenuCtrl'
      })
      .state('main.item', {
        url: '/menu/:Id',
        templateUrl: 'views/states/item.html',
        data : {requireLogin : true },
        controller: 'ItemCtrl'
      })
      .state('main.taxes', {
        url: '/taxes',
        templateUrl: 'views/states/taxes.html',
        data : {requireLogin : true },
        controller: 'TaxesCtrl'
      })
      .state('main.tables', {
        url: '/tables',
        templateUrl: 'views/states/tables.html',
        data : {requireLogin : true },
        controller: 'TablesCtrl'
      })
    ;

    $urlRouterProvider.otherwise('/main/dashboard');

    // Use x-www-form-urlencoded Content-Type
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/json';
    $httpProvider.defaults.headers.common['Content-Type'] = $httpProvider.defaults.headers.post['Content-Type'];
    $httpProvider.interceptors.push(function($q, localStorageService) {
      return {
        'request': function(config) {

          config.headers = config.headers || {};
          if (localStorageService.get('user')) {
            config.headers.Authorization = 'Bearer ' + localStorageService.get('user').token;
          }
          return config;
        }
      };
    });
  })

  .controller('AppCtrl', function ($scope, SessionService) {
    SessionService.isToken();

  })



