'use strict';

(function () {


  angular.module('app')
    .component("profile", {
      templateUrl: 'app/profile/profile.html',
      controller: profileCtrl
    })
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
        .state('profile', {
          url: '/profile',
          template: '<profile></profile>',
          resolve: {
            "currentAuth": ["$firebaseAuth", "$state", function ($firebaseAuth, $state) {
              // $requireSignIn returns a promise so the resolve waits for it to complete
              // If the promise is rejected, it will throw a $stateChangeError (see above)
              return $firebaseAuth().$requireSignIn();
            }]
          }
        });
    }]);

  profileCtrl.$inject = ["$state", "$scope", "UserSvc"];
  function profileCtrl($state, $scope, UserSvc) {
    var ctrl = this;
    ctrl.profileStates = [
      {
        state: "profile.edit",
        label: "Profile Edit"
      }, {
        state: "profile.paymentInfo",
        label: "Payment Info"
      }, {
        state: "profile.reviews",
        label: "Reviews"
      }
      /*, {
        state: "profile.references",
        label: "References"
      }*/
    ];
    ctrl.activeState = ctrl.profileStates[0];


    function bootstrap() {
      $state.go("profile.edit");
      ctrl.userObj = UserSvc.getCurrentUser();

    }

    ctrl.goTo = function (state) {
      ctrl.activeState = state;
    };

    ctrl.menuSelectOptionChanged = function () {
      $state.go(ctrl.activeState.state);
    };

    // End of the controller
    bootstrap();
  }
})();
