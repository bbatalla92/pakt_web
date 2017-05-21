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

  listingEditPageCtrl.$inject = ["$stateParams", "UtilsSvc", '$scope', "$timeout", "ItemSvc", "$mdDialog","$state"];

  function listingEditPageCtrl($stateParams, UtilsSvc, $scope, $timeout, ItemSvc, $mdDialog, $state) {
    var ctrl = this;
    ctrl.showImage = true;
    ctrl.activeImage = {};
    ctrl.item = {
      isRented: false,
      rates: {hourly: 0, daily: 0, weekly: 0, monthly: 0, currency: "dollar"},
      imageData: []
    };
    ctrl.images = [];
    var addressAutocomplete = new google.maps.places.Autocomplete(document.getElementById("editPageAutoComplete"));

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

    addressAutocomplete.addListener('place_changed', function () {
      var place = addressAutocomplete.getPlace();
      ctrl.item.location = {
        address: place.formatted_address,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };
      console.log("PLACE CHANGED", ctrl.item.location);

    });

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
      ItemSvc.saveItem(ctrl.item)
        .then(function (res) {
          console.log("ITEM SAVED", res);
          $state.go('listings', {id: res.id})
        })
        .catch(function (error) {
          console.log("Error", error);
        })
    };
    // End of Controller
    bootstrap();
  }
})();
