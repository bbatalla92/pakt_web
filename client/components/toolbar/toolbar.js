'use strict';

(function () {


  angular.module('app')
    .component("toolbar", {
      templateUrl: 'components/toolbar/toolbar.html',
      controller: toolbarCtrl
    });

  toolbarCtrl.$inject = ['$mdDialog', '$mdMedia', '$scope', '$state', 'APP_NAME'];

  /** @ngInject */
  function toolbarCtrl($mdDialog, $mdMedia, $scope, $state, APP_NAME) {
    var ctrl = this;


    ctrl.appName = APP_NAME;
    ctrl.flags = {
      hideTitle: true
    };

    // Watching and makes the toolbar title hide when in main page
    $scope.$watch( function() {
      ctrl.flags.hideTitle = $state.current.name == 'main';
    });


    ctrl.openSignInDialog = function (newSignIn, ev) {
      console.log(newSignIn);
      $mdDialog.show(
        {
          template: '<sign-up-form is-new="new"></sign-up-form>',
          controller: function(isNew, $scope){
            $scope.new = isNew;
          },
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true,
          locals:{
            isNew: newSignIn
          },
          fullscreen: $mdMedia('xs')
        }
      );
    };
  };


})();
