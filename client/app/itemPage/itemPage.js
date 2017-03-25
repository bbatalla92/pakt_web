

(function(){
  'use strict';


angular.module('app')
  .component("itemPage",{
    templateUrl: 'app/itemPage/itemPage.html',
    controller: itemPageCtrl
  })
  .config(['$stateProvider',function ($stateProvider) {
    $stateProvider
      .state('item', {
        url: '/item',
        template: '<item-page></item-page>'
      });
  }]);



  function itemPageCtrl(){
    var ctrl = this;


  }


})();
