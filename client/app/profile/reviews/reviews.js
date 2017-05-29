'use strict';

(function () {
  angular.module('app')
    .component("reviews", {
      templateUrl: 'app/profile/reviews/reviews.html',
      controller: reviewsCtrl
    })
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
        .state('profile.reviews', {
          template: '<reviews></reviews>'
        });
    }]);

  reviewsCtrl.$inject = ["APP_NAME", "UserSvc", "$mdDialog", "$mdMedia","$scope"];
  function reviewsCtrl(APP_NAME, UserSvc, $mdDialog, $mdMedia, $scope) {
    var ctrl = this;



  }
})();
