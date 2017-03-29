'use strict';

(function () {


  angular.module('app')
    .component("toolbar", {
      templateUrl: 'components/toolbar/toolbar.html',
      controller: toolbarCtrl
    });

  toolbarCtrl.$inject = ['$mdDialog', '$mdMedia', '$scope', '$state'];

  /** @ngInject */
  function toolbarCtrl($mdDialog, $mdMedia, $scope, $state) {
    var ctrl = this;
    ctrl.flags = {
      hideTitle: true
    };

    // Watching and makes the toolbar title hide when in main page
    $scope.$watch( () => {
      ctrl.flags.hideTitle = $state.current.name == 'main';
    });


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
