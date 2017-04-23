'use strict';

(function () {


  angular.module('app')
    .component("foot", {
      templateUrl: 'components/footer/footer.html',
      controller: footerCtrl
    });

  footerCtrl.$inject = ["APP_NAME"]
  function footerCtrl(APP_NAME) {
    var ctrl = this;

    ctrl.appName = APP_NAME;

    ctrl.language = "eng";
    ctrl.currency = "usd";

  }

})();
