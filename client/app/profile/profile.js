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
            "currentAuth": ["$firebaseAuth", function ($firebaseAuth) {
              // $requireSignIn returns a promise so the resolve waits for it to complete
              // If the promise is rejected, it will throw a $stateChangeError (see above)
              return $firebaseAuth().$requireSignIn();
            }]
          }
        });
    }]);

  profileCtrl.$inject = ["$state", "$scope","UserSvc"];
  function profileCtrl($state, $scope, UserSvc) {
    var ctrl = this;
    ctrl.profileStates = [
      {
        state: "profile.edit",
        label: "Profile Edit"
      }, {
        state: "profile.reviews",
        label: "Reviews"
      }, {
        state: "profile.references",
        label: "References"
      }
    ];
    ctrl.activeState = ctrl.profileStates[0];


    function bootstrap() {
      $state.go("profile.edit");
      ctrl.userObj =  UserSvc.getCurrentUser();

    }

    ctrl.goTo = function (state) {
      //$state.go(state.state);
      ctrl.activeState = state;
    };

    ctrl.save = function(){
      UserSvc.updateUser(ctrl.userObj);
      //console.log("USER", ctrl.userObj);
    };


    $scope.$on('auth-state-changed', function (event, args) {
      $state.go("main");
    });
    // End of the controller
    bootstrap();
  }
})();
