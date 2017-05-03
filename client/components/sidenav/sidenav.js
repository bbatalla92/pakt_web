'use strict';

(function () {


  angular.module('app')
    .component("sidenav", {
      templateUrl: 'components/sidenav/sidenav.html',
      controller: sidenavCtrl
    });

  sidenavCtrl.$inject = ["APP_NAME", "$mdSidenav", "firebaseSvc", "$scope"];
  function sidenavCtrl(APP_NAME, $mdSidenav, firebaseSvc, $scope) {
    var ctrl = this;

    ctrl.flags = {};
    ctrl.user = {};

    ctrl.listItems = [
      {
        label: "Overview",
        icon: 'my_library_books',
        sref:""
      },
      {
        label: "History",
        icon: 'receipt',
        sref:""
      }
    ];


    function bootstrap() {
      getUserObj();
    }

    $scope.$on('auth-state-changed', function (event, args) {
      ctrl.flags.loggedIn = args.loggedIn;
      if (ctrl.flags.loggedIn) {
        getUserObj();
      }
    });

    // Functions below
    function getUserObj() {
      ctrl.user = firebaseSvc.getUserObject();
    }

    ctrl.logout = function () {
      firebaseSvc.signOutUser();
      $mdSidenav('left').toggle();
    };


// End of controller
    ctrl.$init = bootstrap();
  }
})();
