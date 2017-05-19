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

  listingEditPageCtrl.$inject = ["$stateParams", "UtilsSvc", '$scope', "$timeout", "ItemSvc"];

  function listingEditPageCtrl($stateParams, UtilsSvc, $scope, $timeout, ItemSvc) {
    var ctrl = this;
    ctrl.showImage = true;
    ctrl.activeImage = {};
    ctrl.item = {
      isRented: false,
      rates: {hourly: 0, daily: 0, weekly: 0, monthly: 0, currency: "dollar"},
      imageData: []
    };
    ctrl.images = [];

    function bootstrap() {
      if ($stateParams.id != "add") {
        getItem($stateParams.id);
      }
    }

    function getItem(key) {
      ctrl.showImage = false;
      ItemSvc.getItem(key)
        .then(function (res) {
          ctrl.item = res;
          ctrl.images = UtilsSvc.sortImages(ctrl.item.imageData);
          ctrl.showImage = true;
          $scope.$apply();
        })
        .catch(function (error) {
          console.log("Error retrieving item", error);
        });
    }

    ctrl.onImageLoaded = function (image) {
      ctrl.activeImage = ctrl.image;
      ctrl.showImage = false;
      ctrl.images.push(image);
      ctrl.item.imageData.push({
        image: image,
        metaData: {customMetadata: {order: (ctrl.images.length - 1) + ""}}
      });

      $timeout(function () {
        ctrl.showImage = true;
        $scope.$apply();
      }, 500);
    };

    ctrl.save = function () {
      console.log("Starting save");
      ItemSvc.saveItem(ctrl.item)
        .then(function (res) {
          console.log("Success", res)

        })
        .catch(function (error) {
          console.log("Error", error);
        })
    };
    // End of Controller
    bootstrap();
  }
})();
