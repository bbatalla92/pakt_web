(function () {
  'use strict';
  angular.module('app')
    .component("itemPage", {
      templateUrl: 'app/itemPage/itemPage.html',
      controller: itemPageCtrl
    })
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
        .state('item',
          {
          url: '/item/:id',
          template: '<item-page></item-page>',
          params:{
            item: null
          }
        }
        );
    }]);

    itemPageCtrl.$inject = ["$stateParams",'$element','$scope','$window','$document'];

  function itemPageCtrl($stateParams, $element, $scope,$window,$document) {
    var ctrl = this;
    ctrl.item = $stateParams.item;


  }


})();
