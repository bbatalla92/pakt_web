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

  listingEditPageCtrl.$inject = ["$stateParams", '$scope', '$window', "$mdDialog", "$mdMedia", "$timeout"];

  function listingEditPageCtrl($stateParams, $scope, $window, $mdDialog, $mdMedia, $timeout) {
    var ctrl = this;
    ctrl.showImage = true;
    ctrl.activeImageUrl = "";
    ctrl.item = {images:[],rates:{hourly:0,daily:0,weekly:0,monthly:0}};

    function getItem() {

    }



    ctrl.openImageCropDialog = function (event) {
      ctrl.activeImageUrl = ctrl.image;
      ctrl.showImage = false;
      ctrl.item.images.push(ctrl.image);

      $timeout(function () {
        ctrl.showImage = true;
        $scope.$apply();
      },500);
    };
    // End of Controller
  }
})();
