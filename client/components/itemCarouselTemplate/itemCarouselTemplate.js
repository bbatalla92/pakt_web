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

  itemCarouselTemplateCtrl.$inject = ["$timeout"];

  function itemCarouselTemplateCtrl($timeout) {
    var ctrl = this;


    function bootstrap() {
      ctrl.image = {backgroundImage: "url(" + ctrl.item.imageUrls[0] + ")"};
    }


    // end of controller
    $timeout(function () {
      bootstrap()
    }, 1)

  }


})();
