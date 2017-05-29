'use strict';

(function () {


  angular.module('app')
    .component("foot", {
      templateUrl: 'components/footer/footer.html',
      controller: footerCtrl
    });

  footerCtrl.$inject = ["APP_NAME", "$rootScope","$state"]
  function footerCtrl(APP_NAME, $rootScope, $state) {
    var ctrl = this;

    ctrl.flags = {
      hideFooter: false
    };

    var hideFooterStates = {
      results: true,
      messages: true
    };

    ctrl.flags.hideFooter = hideFooterStates[$state.current.name];


    $rootScope.$on('$stateChangeStart',
      function(event, toState, toParams, fromState, fromParams, options){
        ctrl.flags.hideFooter = hideFooterStates[toState.name];
      });



    ctrl.appName = APP_NAME;

    ctrl.language = "eng";
    ctrl.currency = "usd";



  }

})();
