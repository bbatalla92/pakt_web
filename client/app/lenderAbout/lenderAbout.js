(function () {
  'use strict';
  angular.module('app')
    .component("lenderAbout", {
      templateUrl: 'app/lenderAbout/lenderAbout.html',
      controller: lenderAboutCtrl
    })
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
        .state('lenderAbout',
          {
            url: '/become-a-lender',
            template: '<lender-about></lender-about>'
          }
        );
    }]);

  lenderAboutCtrl.$inject = [];

  function lenderAboutCtrl() {
    var ctrl = this;




  }
})();
