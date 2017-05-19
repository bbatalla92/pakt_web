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
      for (var key in items) {
        var p = getItem(key)
          .then(function (res) {
            itemsArr.push(res);
            return res;
          });
        promises.push(p);
      }
      return $q.all(promises);
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
      var copyItem = angular.copy(item);
      return ref.child(copyItem.id).update(copyItem)
        .then(function (res) {
          return saveImages(item);
        })
        .then(function (res) {
          console.log("Save Images", res);
          return "success";
        })
        .catch(function (error) {
          console.log("Error updating item", error);
        });
    }

    function deleteItem() {

    }

    function saveImages(item) {
      var promises = [];
      for (var i = 0; i < item.imageData.length; i++) {
        var b;
        var path = ST_PATH_ITEM_IMAGES + "/" + item.id + (new Date()).getTime();
        if (!item.imageData[i].metaData.key) {
          b = FireUtils.uploadImage(item.imageData[i].image, path, item.imageData[i].metaData);
        } else {
          b = FireUtils.updateImage(item.imageData[i].image, ST_PATH_ITEM_IMAGES + "/"+item.imageData[i].metaData.key, item.imageData[i].metaData);
        }
        promises.push(b);
      }
      return $q.all(promises);
    }


    return {
      saveItem: saveItem,
      getUserItems: getUserItems,
      getItem: getItem
    }
  }

})();
