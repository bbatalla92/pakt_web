'use strict';

(function () {


  angular.module('app')
    .component("profileEdit", {
      templateUrl: 'app/profile/editProfile/profileEdit.html',
      controller: profileEditCtrl
    })
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
        .state('profile.edit', {
          template: '<profile-edit></profile-edit>'
        });
    }]);

  profileEditCtrl.$inject = ["APP_NAME","firebaseSvc"];
  function profileEditCtrl( APP_NAME, firebaseSvc) {
    var ctrl = this;

    ctrl.userObj = {};

    function bootstrap() {
      ctrl.userObj =  firebaseSvc.getCurrentUser();
    }


    // End of the controller
    bootstrap();
  }
})();
