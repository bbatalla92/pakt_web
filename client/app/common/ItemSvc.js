/**
 * Created by bbatal200 on 5/1/17.
 */
(function () {
  "use strict";

  angular.module('app')
    .factory("ItemSvc", UserSvc);

  UserSvc.$inject = ["$q", "$firebaseObject", "UserSvc", "$firebaseStorage", "FireAuth", "FireUtils", "UtilsSvc", "ST_PATH_ITEM_IMAGES"];

  function UserSvc($q, $firebaseObject, UserSvc, $firebaseStorage, FireAuth, FireUtils, UtilsSvc, ST_PATH_ITEM_IMAGES) {
    var ref = firebase.database().ref("item");
    var userObj = UserSvc.getCurrentUser();

    var userItems = [];

    function saveItem(item) {

      return item.id ? updateItem(item) : createItem(item);

    }

    function getItem(id) {
      return ref.child(id).once("value")
        .then(function (res) {
          return res.val();
        })
    }

    function getItemImage(item) {

    }

    function getUserItems(items, itemsArr) {
      var promises = [];

      if (userItems.length) {
        var q = $q.defer();
        q.resolve(userItems);
        return q.promise;
      }

      for (var key in items) {
        var p = getItem(key)
          .then(function (res) {
            userItems.push(res);
            return res;
          });
        promises.push(p);
      }
      return $q.all(promises);
    }

    function deleteImage(delImage, imageData) {
      var path = ST_PATH_ITEM_IMAGES + "/" + delImage.metaData.key;
      FireUtils.deleteImage(path)
        .then(function () {
          return ref.child(delImage.metaData.customMetadata.itemId + "/imageData").set(imageData)
        })
        .then(function (res) {
          userItems = [];
          console.log("RES", res);
        });
    }

    function createItem(item) {
      var tempImageData = {};
      tempImageData.imageData = item.imageData;
      delete item.imageData;
      item.ownerUid = userObj.uid;

      return ref.push(item)
        .then(function (res) {
          item.id = res.key;
          item.imageData = tempImageData.imageData;
          return item.imageData.length && saveImages(item);
        })
        .then(function (res) {
          item.imageData = res;
          updateItem(item);
          UserSvc.saveItemId(item);
          return item;
        })
        .catch(function (error) {
          console.log("Error Saving Item", error);
        });
    }

    function updateItem(item) {
      userItems = [];
      var copyItem = angular.copy(item);
      return saveImages(copyItem)
        .then(function (res) {
          copyItem.imageData = res;
          return ref.child(copyItem.id).update(copyItem);
        })
        .then(function (res) {
          return "success";
        })
        .catch(function (error) {
          console.log("Error updating item", error);
        });
    }

    function deleteItem(item) {
      return UserSvc.deleteItemId(item)
        .then(function (res) {
          return ref.child(item.id).set(null)
        })
        .then(function () {
          return deleteAllImages(item.imageData)
        })
        .then(function (res) {
          userItems = [];
          return "success";
        })
    }

    function deleteAllImages(imageData) {
      var promiseArr = [];
      for(var i = 0; i < imageData.length; i++){
        var q = FireUtils.deleteImage(ST_PATH_ITEM_IMAGES + "/" + imageData[i].metaData.key);
        promiseArr.push(q);
      }
      return $q.all(promiseArr);
    }

    function saveImages(item) {
      var promises = [];
      for (var i = 0; i < item.imageData.length; i++) {
        var b;
        var path = ST_PATH_ITEM_IMAGES + "/" + item.id + (new Date()).getTime();
        if (!item.imageData[i].metaData.key) {
          item.imageData[i].metaData.customMetadata.itemId = item.id;
          b = FireUtils.uploadImage(item.imageData[i].image, path, item.imageData[i].metaData);
        } else {
          b = FireUtils.updateImage(item.imageData[i].image, ST_PATH_ITEM_IMAGES + "/" + item.imageData[i].metaData.key, item.imageData[i].metaData);
        }
        promises.push(b);
      }
      return $q.all(promises);
    }

    return {
      saveItem: saveItem,
      getUserItems: getUserItems,
      getItem: getItem,
      deleteImage: deleteImage,
      deleteItem: deleteItem
    }
  }

})();
