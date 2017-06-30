'use strict';

(function () {


  angular.module('app')
    .component("sidenav", {
      templateUrl: 'components/sidenav/sidenav.html',
      controller: sidenavCtrl
    });

  sidenavCtrl.$inject = ["APP_NAME", "$mdSidenav", "UserSvc", "$scope","$mdDialog", "$mdMedia"];
  function sidenavCtrl(APP_NAME, $mdSidenav, UserSvc, $scope, $mdDialog, $mdMedia) {
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
        sref: "messages"
      }, {
        label: "History",
        icon: 'receipt',
        sref: "profile.edit"
      }
    ];



    $scope.$on('user-object-updated', function (event, args) {
        ctrl.user = args.user;
    });

    // Functions below

    ctrl.logout = function () {
      UserSvc.signOutUser();
      $mdSidenav('left').toggle();
    };

    ctrl.close = function () {
      $mdSidenav('left').close();
    };

    ctrl.openSignInDialog = ctrl.openSignInDialog = function (newSignIn, ev) {
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
      )
        .then(function(){
          console.log("FINSIHED")
        })
        .catch(function(){
        }).finally(function(){
        $mdSidenav('left').close();

      });
    };


// End of controller
  }
})();
