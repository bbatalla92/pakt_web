/**
 * Created by Brennan on 4/3/2017.
 */


(function () {
  'use strict';

  angular.module("app")
    .factory("ProfileSvc", profileSvc);

  profileSvc.$inject = ["$http"];

  function profileSvc($http) {

    return {}
  }

})();
