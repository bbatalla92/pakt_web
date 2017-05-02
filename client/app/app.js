'use strict';

/**
 * @ngdoc overview
 * @name paktApp
 * @description
 * # paktApp
 *
 * Main module of the application.
 */
angular
  .module('app', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    "ui.router",
    'ngSanitize',
    'ngMaterial',
    'ngMdIcons',
    'firebase'
  ])
  .constant("APP_NAME", "Lendr")
  .config(['$urlRouterProvider', '$locationProvider','$mdAriaProvider',function ($urlRouterProvider, $locationProvider,$mdAriaProvider) {

    $mdAriaProvider.disableWarnings();

    //TODO - Enable this when going live
    //$locationProvider.html5Mode(true).hashPrefix('!');

    $urlRouterProvider.otherwise('/');

  }])
  .run(['$rootScope', '$window',
    function ($rootScope, $window) {

    }]);
