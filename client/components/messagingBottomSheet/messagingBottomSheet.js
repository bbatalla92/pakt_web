'use strict';

(function () {


  angular.module('app')
    .component("messagingBottomSheet", {
      templateUrl: 'components/messagingBottomSheet/messagingBottomSheet.html',
      controller: messagingBottomSheetCtrl,
      bindings:{
        active: '='
      }
    });

  messagingBottomSheetCtrl.$inject = [];
  function messagingBottomSheetCtrl() {
    var ctrl = this;



    ctrl.bsActive = true;


  }

})();
