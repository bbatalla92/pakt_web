(function () {
  'use strict';
  angular.module('app')
    .component("about", {
      templateUrl: 'app/about/about.html',
      controller: aboutCtrl
    })
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
        .state('about',
          {
            url: '/about',
            template: '<about></about>'
          }
        );
    }]);

  /*@ngInject*/
  function aboutCtrl(APP_NAME) {
    var ctrl = this;

    ctrl.APP_NAME = APP_NAME;


  }
})();
