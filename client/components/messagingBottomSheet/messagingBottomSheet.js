'use strict';

(function () {


  angular.module('app')
    .component("messagingBottomSheet", {
      templateUrl: 'components/messagingBottomSheet/messagingBottomSheet.html',
      controller: messagingBottomSheetCtrl
    });

  messagingBottomSheetCtrl.$inject = [];
  function messagingBottomSheetCtrl() {
    var ctrl = this;


    ctrl.bsActive = false;


  }

})();
