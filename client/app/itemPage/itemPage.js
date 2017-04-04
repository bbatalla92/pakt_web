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

    ctrl.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 39.9525839, lng: -75.16522150000003},
      zoom: 12,
      disableDefaultUI: true,
      scrollwheel:  false

    });


    //google.maps.event.trigger(map, "resize");


    angular.element($window).bind("scroll", function() {
      ctrl.dynamicStyleClass.stickyForm = this.pageYOffset >= 530 && this.pageYOffset < 2000;
      ctrl.dynamicStyleClass.stuckFormBottom = this.pageYOffset >=  2000;

      $scope.$apply();
    });






  }


})();
