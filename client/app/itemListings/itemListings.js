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
              "currentAuth": ["$firebaseAuth", "$state", function ($firebaseAuth, $state) {
                // $requireSignIn returns a promise so the resolve waits for it to complete
                // If the promise is rejected, it will throw a $stateChangeError (see above)
                return $firebaseAuth().$requireSignIn();
              }]
            }
          }
        );
    }]);

  itemListingsCtrl.$inject = ["$stateParams", '$scope', '$window', "ItemSvc", "UserSvc"];

  function itemListingsCtrl($stateParams, $scope, $window, ItemSvc, UserSvc) {
    var ctrl = this;
    ctrl.items = [];
    var userObj = UserSvc.getCurrentUser();


    function getItems(items) {
      ItemSvc.getUserItems(items, ctrl.items)
        .then(function (res) {
          //ctrl.items = res;
          console.log("Listings page", res);
        });
    }

    // End of Controller
    if (userObj.items) {
      getItems(userObj.items);
    }

    $scope.$on('user-object-updated', function (event, args) {
      console.log("Listings page", args);
      userObj = args.user;
      if (!ctrl.items.length)
        getItems(userObj.items);
    });
  }
})();
