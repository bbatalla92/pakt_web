(function () {
  'use strict';
  angular.module('app')
    .component("listingEditPage", {
      templateUrl: 'app/listingEditPage/listingEditPage.html',
      controller: listingEditPageCtrl
    })
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
        .state('listingEditPage',
          {
            url: '/listings/:id',
            template: '<listing-edit-page></listing-edit-page>',
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

  listingEditPageCtrl.$inject = ["$stateParams", '$scope', '$window', "$timeout"];

  function listingEditPageCtrl($stateParams, $scope, $window) {
    var ctrl = this;

    function getItem() {

    }


    // End of Controller
  }
})();
