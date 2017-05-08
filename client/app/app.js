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
    'firebase',
    "ui.router.stateHelper",
    'ngImgCrop'
  ])
  .constant("APP_NAME", "Lendr")
  .constant("G", "google")
  .constant("FB", "facebook")
  .constant("EMAIL_PASS", "emailpass")
  .config(['$urlRouterProvider', '$locationProvider', '$mdAriaProvider', function ($urlRouterProvider, $locationProvider, $mdAriaProvider) {

    $mdAriaProvider.disableWarnings();

    //TODO - Enable this when going live
    //$locationProvider.html5Mode(true).hashPrefix('!');

    $urlRouterProvider.otherwise('/');

  }])
  .run(['$rootScope', '$window', '$state',
    function ($rootScope, $window, $state) {

      $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
        // We can catch the error thrown when the $requireSignIn promise is rejected
        // and redirect the user back to the home page
        if (error === "AUTH_REQUIRED") {
          $state.go("main");
        }


      });
    }]);
