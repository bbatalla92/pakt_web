/**
 * Created by bbatal200 on 5/1/17.
 */
(function () {
  "use strict";

  angular.module('app')
    .factory("UserSvc", UserSvc);

  UserSvc.$inject = ["$firebaseObject", "UtilsSvc", "$rootScope", "FireAuth", "FireUtils", "ST_PATH_PROFILE_IMAGE", "$cookies", "COOKIE_USER"];

  function UserSvc($firebaseObject, UtilsSvc, $rootScope, FireAuth, FireUtils, ST_PATH_PROFILE_IMAGE, $cookies, COOKIE_USER) {
    var ref = firebase.database().ref("user");
    var userObj = {uid: ''};

    firebase.auth().onAuthStateChanged(function (userAuthData) {
      if (userAuthData) {
        userObj = $cookies.get(COOKIE_USER) && JSON.parse($cookies.get(COOKIE_USER)) ||  {uid: ''};
          FireUtils.objectExists(ref.child(userAuthData.uid))
            .then(function (userExists) {
              if (!userExists) {
                userObj.uid = userAuthData.uid;
                createUserData(userAuthData.providerData[0], userAuthData.uid);
              } else {
                getUserData(userAuthData.uid);
              }
            })
        } else {
          userObj = {};
          $cookies.put(COOKIE_USER, undefined);
          $rootScope.$broadcast('user-object-updated', {user: undefined});
        }
      }
    );

    function login(type, data) {
      return FireAuth.login(type, data);
    }

    // This function allows a user to be created then saves its initial data in the realtime DB.
    function signUpUserEmailPass(data) {
      return FireAuth.createUserEmailPassword(data)
        .then(function (res) {
          var obj = data;
          delete obj.password;
          return createUserData(obj, res.uid);
        })
        .then(function (res) {
          return res;
        })
    }

    function createUserData(providerData, firebaseAuthUid) {
      delete providerData.providerId;
      delete providerData.uid;
      if (providerData.displayName) {
        var nameArr = providerData.displayName.split(" ");
        providerData.firstName = nameArr[0];
        if (nameArr.length > 1) {
          providerData.lastName = nameArr[nameArr.length - 1];
        }
      } else {
        providerData.displayName = providerData.firstName + " " + providerData.lastName;
      }
      delete providerData.displayName;

      UtilsSvc.downloadImageFromUrl(providerData.photoURL)
        .then(function (res) {
          return uploadMainImage(res, 'blob');
        })
        .then(function (res) {
          var u = {photoURL: res,
                    firstName: providerData.firstName,
                    lastName: providerData.lastName,
                    email: providerData.email
          };
          userObj = u;
          userObj.uid = firebaseAuthUid;
          return ref.child(firebaseAuthUid).set(u);
        })
        .then(function (snapshot) {
          return snapshot;
        })
        .catch(function (error) {
          console.log("Error creating user", error);
        });
    }

    function getUserData(uid) {
      //console.log("UID?",uid);
      var objRef = ref.child(uid);
      return objRef.on("value", function (res) {
        userObj = res.val();
        userObj.uid = uid;
        getUserImage();
        return res.val();
      })

    }

    function getUserImage() {
      if (!userObj.uid) return;

      var storageRef = firebase.storage().ref(ST_PATH_PROFILE_IMAGE + "/" + UtilsSvc.hashString(userObj.uid));
      storageRef.getDownloadURL()
        .then(function (url) {
          userObj.photoURL = url;
          $rootScope.$broadcast('user-object-updated', {user: userObj});
          $cookies.put(COOKIE_USER, JSON.stringify(userObj));
        });
    }

    function getCurrentUser() {
      return userObj || firebase.auth().currentUser;
    }

    function signOutUser() {
      return firebase.auth().signOut();
    }

    function updateUser(user) {
      console.log(user);
      return ref.child(user.uid).set(user)
        .then(function (res) {
          $rootScope.$broadcast('user-object-updated', {user: userObj});
          return res;
        })
    }

    function saveItemId(item) {
      ref.child(userObj.uid).child("items/" + item.id).set(item.id);
    }

    function deleteItemId(item) {
      return ref.child(userObj.uid).child("items/" + item.id).set(null);
    }

    function uploadMainImage(image, type) {
      return FireUtils.uploadImage(image, ST_PATH_PROFILE_IMAGE + "/" + UtilsSvc.hashString(userObj.uid), {}, type)
        .then(function (res) {
          userObj.photoURL = res.image;
          $rootScope.$broadcast('user-object-updated', {user: userObj});
          return res.image;
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    return {
      getCurrentUser: getCurrentUser,
      signOutUser: signOutUser,
      login: login,
      updateUser: updateUser,
      signUpUserEmailPass: signUpUserEmailPass,
      uploadMainImage: uploadMainImage,
      saveItemId: saveItemId,
      deleteItemId:deleteItemId
    }
  }

})();
