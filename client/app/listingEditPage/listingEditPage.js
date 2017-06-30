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

  listingEditPageCtrl.$inject = ["$stateParams", "UtilsSvc", '$scope', "$timeout", "ItemSvc", "$mdDialog", "$state"];

  function listingEditPageCtrl($stateParams, UtilsSvc, $scope, $timeout, ItemSvc, $mdDialog, $state) {
    var ctrl = this;
    ctrl.showImage = true;
    ctrl.activeImage = {};
    ctrl.search = {};
    ctrl.item = {
      isRented: false,
      rates: {hourly: 0, daily: 0, weekly: 0, monthly: 0, currency: "dollar"},
      imageData: [],
      _geoloc: {},
      location: {
        address: null,
        lat: '',
        lng: ''
      }
    }
    ;
    //ctrl.images = [];
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
      ctrl.item._geoloc = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };

    });

    ctrl.onImageLoaded = function (image) {
      ctrl.activeImage = ctrl.image;
      ctrl.showImage = false;

      ctrl.item.imageData.push({
        image: image,
        metaData: {customMetadata: {order: (ctrl.item.imageData.length) + ""}}
      });

      $timeout(function () {
        ctrl.showImage = true;
        $scope.$apply();
      }, 500);
    };

    ctrl.save = function () {

      ItemSvc.saveItem(ctrl.item)
        .then(function (res) {
          if (!ctrl.item.id) {
            $state.go('listingEditPage', {id: res.id}, {notify: false});
            ctrl.item.id = res.id;
          }
          UtilsSvc.toast("Item Saved!");
        })
        .catch(function (error) {
          console.log("Error", error);
          UtilsSvc.toast("Error saving item");
        })
    };

    ctrl.deleteItem = function (ev) {
      $mdDialog.show(
        $mdDialog.confirm()
          .title('Are you sure you would like to delete this Item?')
          .textContent('')
          .ariaLabel('Delete Image')
          .targetEvent(ev)
          .ok('Yes')
          .cancel('Nevermind')
      )
        .then(function () {

          if (ctrl.item.id) {
            ItemSvc.deleteItem(ctrl.item)
              .then(function () {
                $state.go("listings");
              });
          } else {
            $state.go("listings");
          }
        });

    };


    // End of Controller
    bootstrap();
  }
})();
