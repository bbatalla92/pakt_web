'use strict';

(function () {


  angular.module('app')
    .component("homeItemSearchBar", {
      templateUrl: 'components/homeItemSearchBar/homeItemSearchBar.html',
      controller: homeItemSearchBarCtrl,
      bindings: {
        showSearchForm: '<'
      }
    });

  homeItemSearchBarCtrl.$inject = ["$mdDialog", "$mdMedia", "UtilsSvc"];
  function homeItemSearchBarCtrl($mdDialog, $mdMedia, UtilsSvc) {
    var ctrl = this;


    var locationAutocomplete = new google.maps.places.Autocomplete(document.getElementById("locationSearchBar"));


    ctrl.searchParams = {
      keyword: "",
      location: UtilsSvc.getUserLocation(),
      startDate: '',
      endDate: ''
    };


    ctrl.showDatePanel = function (event) {
      var config = {
        attachTo: angular.element(document.body),
        targetEvent: event,
        template: '<date-picker></date-picker>',
        clickOutsideToClose: true,
        escapeToClose: true,
        focusOnOpen: true,
        fullscreen: $mdMedia('xs')
      };
      $mdDialog.show(config)
        .then(function (arr) {
          ctrl.searchParams.startDate = arr[0];
          ctrl.searchParams.endDate = arr[1];
        })
        .catch(function () {

        })
    };

    locationAutocomplete.addListener('place_changed', function () {
      var place = locationAutocomplete.getPlace();
      ctrl.searchParams.location = {
        address: place.formatted_address,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };
    });


  }


})();
