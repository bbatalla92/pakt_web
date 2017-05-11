'use strict';

(function(){


angular.module('app')
  .component("imageCropDialog",{
    templateUrl: 'components/imageCropDialog/imageCropDialog.html',
    controller: imageCropDialogCtrl,
    bindings:{
      image: "<",
      options: "<"
    }
  });

  imageCropDialogCtrl.$inject = ["$mdDialog"];
  function imageCropDialogCtrl($mdDialog){
    var ctrl = this;
    ctrl.resultImage = "";

    ctrl.saveImage = function(){
      //console.log(ctrl.resultImage)
      //UserSvc.uploadMainImage(ctrl.resultImage);
      $mdDialog.hide(ctrl.resultImage);
    }


  }


})();
