(function () {
  'use strict';


  angular.module('app')
    .component("signUpForm", {
      templateUrl: 'components/signUpForm/signUpForm.html',
      controller: signUpFormCtrl
    });

  signUpFormCtrl.$inject = ['$mdDialog'];

  function signUpFormCtrl($mdDialog) {
    var ctrl = this;

    ctrl.closeDialog = function () {
      console.log('close');
      $mdDialog.cancel();
    };
  }


})();
