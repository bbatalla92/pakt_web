'use strict';

(function () {


  angular.module('app')
    .component("foot", {
      templateUrl: 'components/footer/footer.html',
      controller: footerCtrl
    });

  footerCtrl.$inject = ["APP_NAME", "$scope","$state"]
  function footerCtrl(APP_NAME, $scope, $state) {
    var ctrl = this;

    ctrl.flags = {
      hideFooter: false
    };

    $scope.$watch(function () {
      ctrl.flags.hideFooter = $state.current.name == 'results';
    });

    ctrl.appName = APP_NAME;

    ctrl.language = "eng";
    ctrl.currency = "usd";

  }

})();
