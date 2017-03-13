'use strict';

(function () {


  angular.module('app')
    .component("foot", {
      templateUrl: 'components/footer/footer.html',
      controller: footerCtrl
    });


  function footerCtrl() {
    var ctrl = this;

    ctrl.language = "eng";
    ctrl.currency = "usd";

  }

})();
