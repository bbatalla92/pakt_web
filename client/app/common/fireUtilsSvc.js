/**
 * Created by bbatal200 on 5/1/17.
 */
(function () {
  "use strict";

  angular.module('app')
    .factory("FireUtils", firebaseSvc);

  firebaseSvc.$inject = ["$q", "ST_PATH_ITEM_IMAGES"];
  function firebaseSvc($q, ST_PATH_ITEM_IMAGES) {
    var storageRef = firebase.storage().ref();

    function objectExists(ref) {
      var q = $q.defer();
      ref.once('value', function (res) {
        q.resolve(res.exists());
      });
      return q.promise;
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

          return {
            image: snapshot.a.downloadURLs[0],
            metaData: {
              contentType: snapshot.a.contentType,
              customMetadata: snapshot.a.customMetadata,
              size: snapshot.a.size,
              key: snapshot.a.name,
              timeCreated: snapshot.a.timeCreated,
              updated: snapshot.a.updated,
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
      deleteImage:deleteImage
    }
  }

})();
