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

  itemImageGalleryCtrl.$inject = ["$timeout", "UtilsSvc", "$scope", "$mdDialog", "ItemSvc"];
  function itemImageGalleryCtrl($timeout, UtilsSvc, $scope, $mdDialog, ItemSvc) {
    var ctrl = this;

    ctrl.imageIndex = 0;
    ctrl.activeImage = {};
    var imageLength;

    // ___________ Functions below ____________
    function bootstrap() {
      imageLength = ctrl.imageData.length;
      ctrl.images = UtilsSvc.sortImages(ctrl.imageData);
      ctrl.activeImage.backgroundImage = "url(" + ctrl.images[ctrl.imageIndex] + ")";
    }

    ctrl.nextImage = function (next) {
      if (ctrl.images.length !== ctrl.imageData.length) ctrl.images = UtilsSvc.sortImages(ctrl.imageData);

      if (next) {
        (ctrl.imageIndex + 1 >= ctrl.images.length) ? ctrl.imageIndex = 0 : ctrl.imageIndex++;
      } else {
        (ctrl.imageIndex - 1 < 0) ? ctrl.imageIndex = ctrl.images.length - 1 : ctrl.imageIndex--;
      }
      ctrl.activeImage.backgroundImage = "url(" + ctrl.images[ctrl.imageIndex] + ")";

    };

    ctrl.setMainImage = function () {
      if (ctrl.imageIndex === 0) return;
      ctrl.imageData[0].metaData.customMetadata.order = ctrl.imageIndex;
      ctrl.imageData[ctrl.imageIndex].metaData.customMetadata.order = 0;
      ctrl.images = UtilsSvc.sortImages(ctrl.imageData);
      ctrl.imageIndex = 0;
      ctrl.activeImage.backgroundImage = "url(" + ctrl.images[ctrl.imageIndex] + ")";
    };

    ctrl.deleteImage = function (ev) {
      $mdDialog.show(
        $mdDialog.confirm()
          .title('Are you sure you would like to delete this image?')
          .textContent('')
          .ariaLabel('Delete Image')
          .targetEvent(ev)
          .ok('Yes')
          .cancel('Nevermind')
      )
        .then(function () {
          // YES
          var delImageData;
          for (var i = 0; i < ctrl.imageData.length; i++) {
            console.log(ctrl.imageData[i].metaData.customMetadata.order);

            if (ctrl.imageData[i].metaData.customMetadata.order == ctrl.imageIndex) {
              delImageData = angular.copy(ctrl.imageData[i]);
              ctrl.imageData[i] = null;
              ctrl.imageData.splice(i,1);
              console.log(ctrl.imageData)
            }
            if (ctrl.imageData[i] && ctrl.imageData[i].metaData.customMetadata.order >= ctrl.imageIndex) {
              ctrl.imageData[i].metaData.customMetadata.order = ctrl.imageData[i].metaData.customMetadata.order - 1;
            }
          }

          ctrl.images = UtilsSvc.sortImages(ctrl.imageData);

          if (ctrl.imageIndex === ctrl.imageData.length - 1){
            ctrl.imageIndex = ctrl.imageData.length - 2;
          }
          ctrl.activeImage.backgroundImage = "url(" + ctrl.images[ctrl.imageIndex] + ")";


          if(!delImageData.metaData.key) return;

          ItemSvc.deleteImage(delImageData, ctrl.imageData)
            .then(function(){
              console.log("Deleted Image");
            })
            .catch(function(error){
              console.log("Error deleting Image", error);
            });
        })
        .catch(function () {

        })
    };

    $scope.$watch(function (newValue, oldValue, scope) {
      if (imageLength && imageLength !== ctrl.imageData.length) {
        imageLength = ctrl.imageData.length;
        ctrl.imageIndex = ctrl.imageData.length - 1;
        ctrl.images = UtilsSvc.sortImages(ctrl.imageData);
        ctrl.activeImage.backgroundImage = "url(" + ctrl.images[ctrl.imageIndex] + ")";
      }
    });

// End of Controller
    $timeout(function () {
      bootstrap()
    }, 1);
  }
})();
