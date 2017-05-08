/**
 * Created by bbatal200 on 5/1/17.
 */
(function () {
  "use strict";

  angular.module('app')
    .factory("UserSvc", UserSvc);

  UserSvc.$inject = ["$q", "$firebaseObject", "$timeout", "$rootScope", "FireAuth", "fireUtils"];

  function UserSvc($q,$firebaseObject, $timeout, $rootScope, FireAuth, fireUtils) {
    var ref = firebase.database().ref("users");
    var userObj = {};

    firebase.auth().onAuthStateChanged(function (user) {
      var u = JSON.parse(JSON.stringify(user));
      if (user && user.providerData && user.providerData[0]) {
        userObj = angular.copy(user.providerData[0]);
        userObj.uid = user.uid;
        getUserData(user.uid);
        $timeout(function () {
          $rootScope.$broadcast('auth-state-changed', {loggedIn: true});
        }, 1)
      } else {
        $rootScope.$broadcast('auth-state-changed', {loggedIn: false});
      }
    });

    function login(type, data) {
      var user;
      return FireAuth.login(type, data)
        .then(function (res) {
          user = JSON.parse(JSON.stringify(res.user));

          console.log(user);

          return fireUtils.objectExists(ref.child(user.uid));
        })
        .then(function(boolean){
          if(!boolean){
            createUserData(user.providerData[0], user.uid);
          }
        })
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

    function createUserData(user, uid) {
      delete user.providerId;
      delete user.uid;
      if (user.displayName) {
        var nameArr = user.displayName.split(" ");
        user.firstName = nameArr[0];
        if (nameArr.length > 1) {
          user.lastName = nameArr[nameArr.length - 1];
        }
      } else {
        user.displayName = user.firstName + " " + user.lastName;
      }
      var id = uid || user.uid;
      ref.child(id).set(user)
        .then(function (snapshot) {
          return snapshot;
        });
    }

    function getUserData(uid) {
      //console.log("UID?",uid);
      var obj = $firebaseObject(ref.child(uid));

      return obj.$loaded()
        .then(function (res) {
          userObj = res;
        })
    }

    function getCurrentUser() {
      return userObj || firebase.auth().currentUser;
    }

    function signOutUser() {
      return firebase.auth().signOut();
    }

    function updateUser(user) {
      return user.$save()
        .then(function (res) {
          console.log("UPDATED", res);
          return res;
        })
    }

    function uploadMainImage(){
      fireUtils.uploadImage();
    }

    return {
      getCurrentUser: getCurrentUser,
      signOutUser: signOutUser,
      login: login,
      updateUser: updateUser,
      signUpUserEmailPass: signUpUserEmailPass,
      uploadMainImage:uploadMainImage
    }
  }

})();
