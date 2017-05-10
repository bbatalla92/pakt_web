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

    function uploadImage(uid, file){
      var ref = firebase.storage().ref(uid +"/profileImage");
      var uploadTask = ref.putString(file, 'data_url', { contentType: "image/gif" });

      return uploadTask
        .then(function(snapshot) {
        return snapshot.a.downloadURLs[0];
      })
      .catch(function(error) {
        console.error(error);
      });
    }




    return {
      objectExists:objectExists,
      uploadImage:uploadImage
    }
  }

})();
