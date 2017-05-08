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

  profileEditCtrl.$inject = ["APP_NAME","UserSvc"];
  function profileEditCtrl( APP_NAME, UserSvc) {
    var ctrl = this;
    ctrl.image = "";

    function bootstrap() {
      ctrl.userObj =  UserSvc.getCurrentUser();
      console.log("User", ctrl.userObj);
    }

    ctrl.imageChanged = function(){
      console.log("Image changed", ctrl.image);
    };


    // End of the controller
    bootstrap();
  }
})();
