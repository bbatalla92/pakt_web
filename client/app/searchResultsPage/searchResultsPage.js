'use strict';

(function(){


angular.module('app')
  .component("searchResultsPage",{
    templateUrl: 'app/searchResultsPage/searchResultsPage.html',
    controller: searchResultsPageCtrl
  })
  .config(['$stateProvider',function ($stateProvider) {
    $stateProvider
      .state('results', {
        url: '/results',
        template: '<search-results-page></search-results-page>',
        params: {
          searchParams: null
        }
      });
  }]);

  searchResultsPageCtrl.$injector = ['$stateParams', "$timeout", "$mdMedia"];

  function searchResultsPageCtrl($stateParams, $timeout, $mdMedia){
    var ctrl = this;
    ctrl.searchParams = $stateParams.searchParams;
    ctrl.flags = {
      screenSMoXS: false,
      showMap: false
    };
   ctrl.item =  {
      "price": {"hour": 10, "day":30, "week": 100 },
      "id": "583021",
      "title": "Lawnmower",
      "location": "Forked River, NJ",
      "description": "This is a lawnmower.  It works perfectly fine and takes normal gas.",
      "created": "8461653454",
      "imageUrls": ["assets/images/firepit.jpeg", "assets/images/lawnmower.jpg","assets/images/surboard.jpeg"],
      "ownerId": "678987867564576879890-90897867564"
    };

    function bootstrap(){
      initMap();
      ctrl.flags.screenSMoXS = $mdMedia('xs') || $mdMedia('sm');
    }


    function initMap() {
      ctrl.map = new google.maps.Map(document.getElementById('searchMap'), {
        center: {lat: 39.9525839, lng: -75.16522150000003},
        zoom: 13,
        disableDefaultUI: false,
        scrollwheel: false
      });

      new google.maps.Circle({
        strokeColor: '#FF0000',
        //strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        //fillOpacity: 0.35,
        map: ctrl.map,
        center: {lat: 39.944296, lng: -75.169242},
        radius: 150
      });

      new google.maps.Circle({
        strokeColor: '#FF0000',
        //strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        //fillOpacity: 0.35,
        map: ctrl.map,
        center: {lat: 39.971291, lng: -75.179141},
        radius: 150
      });

      new google.maps.Circle({
        strokeColor: '#FF0000',
        //strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        //fillOpacity: 0.35,
        map: ctrl.map,
        center: {lat: 39.951291, lng: -75.159141},
        radius: 150
      });
    }




    // End of controller
    $timeout(function(){bootstrap();},1)
  }


})();
