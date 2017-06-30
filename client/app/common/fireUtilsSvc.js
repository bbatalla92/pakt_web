/**
 * Created by bbatal200 on 5/1/17.
 */
(function () {
  "use strict";

  angular.module('app')
    .factory("FireUtils", firebaseSvc);

  firebaseSvc.$inject = ["$q", "ST_PATH_ITEM_IMAGES", "ST_PATH_PROFILE_IMAGE", "UtilsSvc"];
  function firebaseSvc($q, ST_PATH_ITEM_IMAGES,ST_PATH_PROFILE_IMAGE, UtilsSvc) {
    var storageRef = firebase.storage().ref();

    function objectExists(ref) {
      var q = $q.defer();
      ref.once('value', function (res) {
        q.resolve(res.exists());
      });
      return q.promise;
    }

    function getProfileImageDownloadURL(uid) {
      if(!uid) return;
      return storageRef.child(ST_PATH_PROFILE_IMAGE).child(""+UtilsSvc.hashString(uid)).getDownloadURL()
        .then(function (url) {
          return url;
        })
    }

    function uploadImage(file, path, metaData, type) {
      var ref = firebase.storage().ref(path);
      var uploadTask;

      if (type === 'blob') {
        uploadTask = ref.put(file);
      } else {
        uploadTask = ref.putString(file, 'data_url', metaData);
      }

      return uploadTask
        .then(function (snapshot) {
          var img = '';

          if (snapshot.metadata && snapshot.metadata.downloadURLs.length) {
            img = snapshot.metadata.downloadURLs[0];
          }

          return {
            image: img,
            metaData: {
              contentType: snapshot.metadata.contentType,
              customMetadata: snapshot.metadata.customMetadata,
              size: snapshot.metadata.size,
              key: snapshot.metadata.name,
              timeCreated: snapshot.metadata.timeCreated,
              updated: snapshot.metadata.updated,
              device: "web"
            }
          };
        })
        .catch(function (error) {
          console.error(error);
        });
    }

    function updateImage(file, path, metaData) {
      var ref = firebase.storage().ref(path);
      return ref.updateMetadata(metaData)
        .then(function (snapshot) {
          return {
            image: file,
            metaData: metaData
          };
        })
        .catch(function (error) {
          console.error(error);
        });
    }

    function deleteImage(path) {
      return storageRef.child(path).delete()
        .then(function (snapshot) {
          return snapshot;
        })
    }

    return {
      objectExists: objectExists,
      uploadImage: uploadImage,
      updateImage: updateImage,
      deleteImage: deleteImage,
      getProfileImageDownloadURL: getProfileImageDownloadURL
    }
  }

})();
