'use strict';

(function () {


  angular.module('app')
    .component("carouselContainer", {
      templateUrl: 'components/carouselContainer/carouselContainer.html',
      controller: carouselContainerCtrl,
      bindings:{
        carouselData: "<"
      }
    });


  function carouselContainerCtrl() {
    var ctrl = this;

  }


})();
