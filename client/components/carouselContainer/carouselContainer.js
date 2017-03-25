'use strict';

(function () {


  angular.module('app')
    .component("carouselContainer", {
      templateUrl: 'components/carouselContainer/carouselContainer.html',
      controller: carouselContainerCtrl,
      bindings:{
        name : '@'
      }
    });


  function carouselContainerCtrl() {
    var ctrl = this;

  }


})();
