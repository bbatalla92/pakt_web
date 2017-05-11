/**
 * Created by bbatal200 on 5/1/17.
 */
(function () {
  "use strict";

  angular.module('app')
    .factory("UserSvc", UserSvc);

  UserSvc.$inject = ["$q", "$firebaseObject", "$firebaseStorage", "$timeout", "$rootScope", "FireAuth", "fireUtils"];

  function UserSvc($q, $firebaseObject, $firebaseStorage, $timeout, $rootScope, FireAuth, fireUtils) {
    var ref = firebase.database().ref("item");
    var userObj = {};



    return {

    }
  }

})();
