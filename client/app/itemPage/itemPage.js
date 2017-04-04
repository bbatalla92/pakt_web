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
            params: {
              item: null
            }
          }
        );
    }]);

  itemPageCtrl.$inject = ["$stateParams", '$scope','$window'];

  function itemPageCtrl($stateParams, $scope, $window) {
    var ctrl = this;
    ctrl.item = $stateParams.item;
    ctrl.dynamicStyleClass = {stickyForm: false};

    ctrl.button = function () {
      console.log(document.scrollingElement.scrollTop);
      console.log($window.scrollY);

    };

    angular.element($window).bind("scroll", function() {
      ctrl.dynamicStyleClass.stickyForm = this.pageYOffset >= 530;

      if(ctrl.dynamicStyleClass.stickyForm)
        console.log('TRUE', this.pageYOffset);
      $scope.$apply();
    });






  }


})();
