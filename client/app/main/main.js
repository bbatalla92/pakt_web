'use strict';

(function(){


angular.module('app')
  .component("main",{
    templateUrl: 'app/main/main.html',
    controller: mainCtrl
  })
  .config(['$stateProvider',function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        template: '<main></main>'
      });
  }]);


  function mainCtrl(){
    var ctrl = this;





  }


})();
