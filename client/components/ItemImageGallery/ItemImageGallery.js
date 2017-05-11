'use strict';

(function () {


  angular.module('app')
    .component("itemImageGallery", {
      templateUrl: 'components/ItemImageGallery/ItemImageGallery.html',
      controller: itemImageGalleryCtrl,
      bindings: {
        images: "="
      }
    });

  itemImageGalleryCtrl.$inject = ["$timeout"];
  function itemImageGalleryCtrl($timeout) {
    var ctrl = this;

    ctrl.imageIndex = 0;
    ctrl.activeImage = {backgroundImage: ""};

    // ___________ Functions below ____________
    function bootstrap() {
      ctrl.activeImage.backgroundImage = "url(" + ctrl.images[ctrl.imageIndex] + ")";
    }

    ctrl.nextImage = function (next) {
      if (next) {
        (ctrl.imageIndex + 1 >= ctrl.images.length) ? ctrl.imageIndex = 0 : ctrl.imageIndex++;
      } else {
        (ctrl.imageIndex - 1 < 0) ? ctrl.imageIndex = ctrl.images.length - 1 : ctrl.imageIndex--;
      }
      ctrl.activeImage.backgroundImage = "url(" + ctrl.images[ctrl.imageIndex] + ")";
    };


// End of Controller
    $timeout(function () {
      bootstrap()
    }, 1);
  }
})();
