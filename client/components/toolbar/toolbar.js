'use strict';

(function () {

  var toolbarCtrl = function ($mdDialog,$mdMedia) {
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

  toolbarCtrl.$inject = ['$mdDialog','$mdMedia'];

  angular.module('app')
    .component("toolbar", {
      templateUrl: 'components/toolbar/toolbar.html',
      controller: toolbarCtrl
    });



})();
