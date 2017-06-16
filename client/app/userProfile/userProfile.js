(function () {
  'use strict';
  angular.module('app')
    .component("userProfile", {
      templateUrl: 'app/userProfile/userProfile.html',
      controller: aboutCtrl
    })
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
        .state('userProfile',
          {
            url: '/profile/:id',
            template: '<user-profile></user-profile>'
          }
        );
    }]);

  aboutCtrl.$inject = ["UserSvc", "$stateParams", "$scope"];

  function aboutCtrl(UserSvc, $stateParams, $scope) {
    var ctrl = this;
    //ctrl.user = undefined;

    function getUser(){

      UserSvc.getTargetUser($stateParams.id)
        .then(function(res){
          ctrl.user = res;
          $scope.$apply();
        })
    }



    // ___________ End of Controller __________________
    getUser();
  }
})();
