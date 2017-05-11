(function () {
  'use strict';
  angular.module('app')
    .component("itemListings", {
      templateUrl: 'app/itemListings/itemListings.html',
      controller: itemListingsCtrl
    })
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
        .state('listings',
          {
            url: '/listings',
            template: '<item-listings></item-listings>',
            resolve: {
              "currentAuth": ["$firebaseAuth", function ($firebaseAuth) {
                // $requireSignIn returns a promise so the resolve waits for it to complete
                // If the promise is rejected, it will throw a $stateChangeError (see above)
                return $firebaseAuth().$requireSignIn();
              }]
            }

          }
        );
    }]);

  itemListingsCtrl.$inject = ["$stateParams", '$scope', '$window', "$timeout"];

  function itemListingsCtrl($stateParams, $scope, $window) {
    var ctrl = this;

    function getItems() {

    }


    // End of Controller
  }
})();
