/**
 * Created by bbatal200 on 5/1/17.
 */
(function () {
  "use strict";

  angular.module('app')
    .factory("fireUtils", firebaseSvc);

  firebaseSvc.$inject = ["$q","$rootScope", "$timeout", "$firebaseStorage"];
  function firebaseSvc($q, $rootScope, $timeout, $firebaseStorage) {
    var storageRef = firebase.storage().ref();

    function objectExists(ref) {
      var q = $q.defer();
      ref.once('value', function (res) {
        q.resolve(res.exists());
      });
      return q.promise;
    }

    function uploadImage(ref, file){
      return $firebaseStorage(storageRef.child(ref)).$put(file, {created: (new Date()).toUTCString()})
    }




    return {
      objectExists:objectExists,
      uploadImage:uploadImage
    }
  }

})();
