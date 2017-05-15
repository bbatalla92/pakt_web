'use strict';

(function () {


  angular.module('app')
    .component("itemImageGallery", {
      templateUrl: 'components/ItemImageGallery/ItemImageGallery.html',
      controller: itemImageGalleryCtrl,
      bindings: {
        images: "=",
//        activeImage: '=',
        editMode: '<'
      }
    });

  itemImageGalleryCtrl.$inject = ["$timeout"];
  function itemImageGalleryCtrl($timeout) {
    var ctrl = this;

    ctrl.imageIndex = 0;
    ctrl.activeImage = {};

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

    ctrl.setMainImage = function(){
      if(ctrl.imageIndex === 0) return;
      var temp = ctrl.images[ctrl.imageIndex];
      ctrl.images[ctrl.imageIndex] = ctrl.images[0];
      ctrl.images[0] = temp;
      ctrl.imageIndex = 0;
      ctrl.activeImage.backgroundImage = "url(" + ctrl.images[ctrl.imageIndex] + ")";
    };

// End of Controller
    $timeout(function () {
      bootstrap()
    }, 1);
  }
})();
