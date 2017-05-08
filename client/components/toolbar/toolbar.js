'use strict';

(function () {


  angular.module('app')
    .component("toolbar", {
      templateUrl: 'components/toolbar/toolbar.html',
      controller: toolbarCtrl
    });

  toolbarCtrl.$inject = ['$mdDialog', '$mdMedia', '$scope', '$state', 'APP_NAME', '$mdSidenav'];

  /** @ngInject */
  function toolbarCtrl($mdDialog, $mdMedia, $scope, $state, APP_NAME, $mdSidenav) {
    var ctrl = this;


    ctrl.appName = APP_NAME;
    ctrl.flags = {
      hideTitle: true,
      loggedIn: false
    };

    // Watching and makes the toolbar title hide when in main page
    $scope.$watch(function () {
      ctrl.flags.hideTitle = $state.current.name == 'main';
    });

    ctrl.openSignInDialog = function (newSignIn, ev) {
      $mdDialog.show(
        {
          template: '<sign-up-form is-new="new"></sign-up-form>',
          controller: function (isNew, $scope) {
            $scope.new = isNew;
          },
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true,
          locals: {
            isNew: newSignIn
          },
          fullscreen: $mdMedia('xs')
        }
      );
    };

    ctrl.toggleSideNav = function () {
      $mdSidenav('left').toggle();
    };

    $scope.$on('auth-state-changed', function (event, args) {
      ctrl.flags.loggedIn = args.loggedIn;
    });

  }
})();
