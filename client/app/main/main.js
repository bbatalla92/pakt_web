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

  mainCtrl.$inject = ["mainSvc", "APP_NAME", "$mdMedia", "$timeout"];

  function mainCtrl(mainSvc, APP_NAME, $mdMedia, $timeout) {
    var ctrl = this;

    ctrl.carouselData = [];
    ctrl.appName = APP_NAME;
    ctrl.searchBarOpenFlag = false;

    function bootstrap() {
      getCarouselData();
    }


    function getCarouselData() {
      mainSvc.getCarouselItems()
        .then(function (res) {
          ctrl.carouselData = res.data;
        });
    }

    ctrl.searchBarOpen = function () {
      if ($mdMedia('xs')) {
        ctrl.searchBarOpenFlag = true;
      } else {
       // window.scrollTo(0, 550);
      }
    };

    function scrollWindow(scrollTo) {
      // console.log(window.pageYOffset);
      /*      window.scrollTo(0, window.pageYOffset + 1);
       if (window.pageYOffset < scrollTo) {
       $timeout(function () {
       scrollWindow(scrollTo);
       }, .01)
       } else {
       return;
       }*/
    }


    // End of the controller
    $timeout(function(){
      bootstrap();
    }, 3000)
  }
})();
