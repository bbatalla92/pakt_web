'use strict';

(function () {


  angular.module('app')
    .component("sidenav", {
      templateUrl: 'components/sidenav/sidenav.html',
      controller: sidenavCtrl
    });

  sidenavCtrl.$inject = ["APP_NAME", "$mdSidenav", "UserSvc", "$scope"];
  function sidenavCtrl(APP_NAME, $mdSidenav, UserSvc, $scope) {
    var ctrl = this;

    ctrl.flags = {};
    ctrl.user = {};

    ctrl.listItems = [
      {
        label: "Account",
        icon: 'person',
        sref: "profile.edit"
      },{
        label: "My Listings",
        icon: 'list',
        sref: "listings"
      }, {
        label: "Messages",
        icon: 'message',
        sref: "profile.edit"
      }, {
        label: "History",
        icon: 'receipt',
        sref: "profile.edit"
      }
    ];

    function bootstrap() {
      getUserObj();
    }

    $scope.$on('user-object-updated', function (event, args) {
        ctrl.user = args.user;
        //$scope.$apply();
      console.log("user",ctrl.user)
    });

    // Functions below
    function getUserObj() {
      ctrl.user = UserSvc.getCurrentUser();
      console.log("side nav", ctrl.user);
    }

    ctrl.logout = function () {
      UserSvc.signOutUser();
      $mdSidenav('left').toggle();
    };

    ctrl.close = function () {
      $mdSidenav('left').close();
    };

// End of controller
    ctrl.$init = bootstrap();
  }
})();
