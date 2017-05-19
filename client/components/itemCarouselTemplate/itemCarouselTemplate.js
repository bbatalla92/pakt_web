'use strict';

(function () {


  angular.module('app')
    .component("itemCarouselTemplate", {
      templateUrl: 'components/itemCarouselTemplate/itemCarouselTemplate.html',
      controller: itemCarouselTemplateCtrl,
      bindings: {
        item: "<"
      }
    });

  itemCarouselTemplateCtrl.$inject = ["$timeout", "UtilsSvc"];

  function itemCarouselTemplateCtrl($timeout, UtilsSvc) {
    var ctrl = this;


    function bootstrap() {
      var images = UtilsSvc.sortImages(ctrl.item.imageData);
      ctrl.image = {backgroundImage: "url(" + images[0] + ")"};
    }


    // end of controller
    $timeout(function () {
      bootstrap()
    }, 1)

  }


})();
