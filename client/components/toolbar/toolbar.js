'use strict';

(function () {




  angular.module('app')
    .component("toolbar", {
      templateUrl: 'components/toolbar/toolbar.html',
      controller: toolbarCtrl
    });

  toolbarCtrl.$inject = ['$mdDialog','$mdMedia'];

  /** @ngInject */
  function toolbarCtrl($mdDialog,$mdMedia) {
    var ctrl = this;

    ctrl.openSignInDialog = function (newSignIn, ev) {
      console.log(newSignIn);
      $mdDialog.show(
        {
          template: '<sign-up-form></sign-up-form>',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true,
          fullscreen: $mdMedia('xs')
        }
      );
    };
  };


})();
