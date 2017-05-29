'use strict';

(function () {
  angular.module('app')
    .component("paymentInfo", {
      templateUrl: 'app/profile/paymentInfo/paymentInfo.html',
      controller: paymentInfoCtrl
    })
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
        .state('profile.paymentInfo', {
          template: '<payment-info></payment-info>'
        });
    }]);

  paymentInfoCtrl.$inject = ["APP_NAME", "UserSvc", "$mdDialog", "$mdMedia","$scope"];
  function paymentInfoCtrl(APP_NAME, UserSvc, $mdDialog, $mdMedia, $scope) {
    var ctrl = this;



  }
})();
