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
    'uiCropper'
  ])
  .config(['$urlRouterProvider', '$locationProvider', '$mdAriaProvider', '$mdThemingProvider', "$httpProvider", function ($urlRouterProvider, $locationProvider, $mdAriaProvider, $mdThemingProvider, $httpProvider) {

    $mdAriaProvider.disableWarnings();

    //TODO - Enable this when going live
   // $locationProvider.html5Mode(true).hashPrefix('!');

    $urlRouterProvider.otherwise('/');

    var customPrimary = {
      '50': '#addcc8',
      '100': '#9bd4bc',
      '200': '#89cdb0',
      '300': '#77c5a4',
      '400': '#65be98',
      '500': '#53B68C',
      '600': '#47a87f',
      '700': '#409672',
      '800': '#388464',
      '900': '#317256',
      'A100': '#bee4d4',
      'A200': '#d0ebe0',
      'A400': '#e2f3ec',
      'A700': '#296149'
    };
    $mdThemingProvider
      .definePalette('customPrimary',
        customPrimary);

    var customAccent = {
      '50': '#da3f00',
      '100': '#f34600',
      '200': '#ff530e',
      '300': '#ff6527',
      '400': '#ff7841',
      '500': '#ff8a5a',
      '600': '#ffae8d',
      '700': '#ffc0a7',
      '800': '#ffd2c0',
      '900': '#ffe5da',
      'A100': '#ffae8d',
      'A200': '#FF9C74',
      'A400': '#ff8a5a',
      'A700': '#fff7f3'
    };
    $mdThemingProvider
      .definePalette('customAccent',
        customAccent);

    $mdThemingProvider.theme('default')
      .primaryPalette('customPrimary')
      .accentPalette('customAccent');

    $httpProvider.defaults.useXDomain = true;


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
