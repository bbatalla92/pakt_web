(function () {
  'use strict';
  angular.module('app')
    .component("userProfilePage", {
      templateUrl: 'app/UserProfilePage/userProfilePage.html',
      controller: UserProfilePageCtrl
    })
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
        .state('userProfilePage',
          {
            url: '/profile/:id',
            template: '<user-profile-page></user-profile-page>'
          }
        );
    }]);

  UserProfilePageCtrl.$inject = ["$stateParams", '$scope', '$window', "ItemSvc", "UserSvc"];

  function UserProfilePageCtrl($stateParams, $scope, $window, ItemSvc, UserSvc) {
    var ctrl = this;




  }
})();
