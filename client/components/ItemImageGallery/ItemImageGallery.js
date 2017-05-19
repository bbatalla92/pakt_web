'use strict';

(function () {


  angular.module('app')
    .component("itemImageGallery", {
      templateUrl: 'components/ItemImageGallery/ItemImageGallery.html',
      controller: itemImageGalleryCtrl,
      bindings: {
        imageData: "=",
        editMode: '<'
      }
    });

  itemImageGalleryCtrl.$inject = ["$timeout", "UtilsSvc", "$scope"];
  function itemImageGalleryCtrl($timeout, UtilsSvc, $scope) {
    var ctrl = this;

    ctrl.imageIndex = 0;
    ctrl.activeImage = {};

    // ___________ Functions below ____________
    function bootstrap() {

      ctrl.images = UtilsSvc.sortImages(ctrl.imageData);
      console.log(""+ctrl.images.length);
      ctrl.activeImage.backgroundImage = "url(" + ctrl.images[ctrl.imageIndex] + ")";
    }

    ctrl.nextImage = function (next) {
      if(ctrl.images.length !== ctrl.imageData.length) ctrl.images = UtilsSvc.sortImages(ctrl.imageData);

      if (next) {
        (ctrl.imageIndex + 1 >= ctrl.images.length) ? ctrl.imageIndex = 0 : ctrl.imageIndex++;
      } else {
        (ctrl.imageIndex - 1 < 0) ? ctrl.imageIndex = ctrl.images.length - 1 : ctrl.imageIndex--;
      }
      ctrl.activeImage.backgroundImage = "url(" + ctrl.images[ctrl.imageIndex] + ")";

    };

    ctrl.setMainImage = function(){
      if(ctrl.imageIndex === 0) return;

      ctrl.imageData[0].metaData.customMetadata.order = ctrl.imageIndex;
      ctrl.imageData[ctrl.imageIndex].metaData.customMetadata.order = 0;
      ctrl.images = UtilsSvc.sortImages(ctrl.imageData);
      ctrl.imageIndex = 0;
      ctrl.activeImage.backgroundImage = "url(" + ctrl.images[ctrl.imageIndex] + ")";
    };

    $scope.$watch(ctrl.imageData, function (newValue, oldValue) {
      console.log("Image added");
      //do some stuff
      //only enters here once
      //newValue and oldValue are equal at that point
    }, true);

// End of Controller
    $timeout(function () {
      bootstrap()
    }, 1);
  }
})();
