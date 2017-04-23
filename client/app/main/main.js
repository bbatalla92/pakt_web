'use strict';

(function () {


  angular.module('app')
    .component("main", {
      templateUrl: 'app/main/main.html',
      controller: mainCtrl
    })
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
        .state('main', {
          url: '/',
          template: '<main></main>'
        });
    }]);

  mainCtrl.$inject = ["mainSvc", "APP_NAME"];

  function mainCtrl(mainSvc, APP_NAME) {
    var ctrl = this;

    ctrl.carouselData = [];
    ctrl.appName = APP_NAME;

    function bootstrap() {
      getCarouselData();
    }


    function getCarouselData() {
      mainSvc.getCarouselItems()
        .then(function (res) {
          ctrl.carouselData = res.data;
        });
    }



    // End of the controller
    bootstrap();
  }
})();
