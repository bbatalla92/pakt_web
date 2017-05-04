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
          template: '<profile></profile>'
        });
    }]);

  profileCtrl.$inject = [ "$state"];

  function profileCtrl($state ) {
    var ctrl = this;

    ctrl.profileStates = [
      {
        state: "profile.edit",
        label: "Profile Edit"
      },{
        state: "profile.photoNbio",
        label: "Photo and Bio"
      },{
        state: "profile.reviews",
        label: "Reviews"
      },{
        state: "profile.references",
        label: "References"
      }
    ];
    ctrl.activeState = ctrl.profileStates[0];


    function bootstrap() {
      $state.go("profile.edit")
    }

    ctrl.goTo = function(state) {
      //$state.go(state.state);
      ctrl.activeState = state;
    };

    // End of the controller
    bootstrap();
  }
})();
