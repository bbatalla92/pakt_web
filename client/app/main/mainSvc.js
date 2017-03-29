/**
 * Created by Brennan on 3/26/2017.
 */


(function () {
  'use strict';

  angular.module("app")
    .factory("mainSvc", mainSvc);

  mainSvc.$inject = ["$http"];

  function mainSvc($http) {

    function getCarouselItems() {
      return $http.get("items.json")
        .then(function (res) {
          return res;
        })
    }


    return {
      getCarouselItems: getCarouselItems
    }
  }

})();
