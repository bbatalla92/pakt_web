/**
 * Created by bbatal200 on 5/1/17.
 */
(function () {
  "use strict";

  angular.module('app')
    .factory("firebaseSvc", firebaseSvc);

  firebaseSvc.$inject = ["$rootScope", "$timeout"];
  function firebaseSvc($rootScope, $timeout) {

    var userObj = {};

    firebase.auth().onAuthStateChanged(function (user) {
      if (user && user.providerData && user.providerData[0]) {
        console.log("Logged In");
        userObj = user.providerData[0];
        $timeout(function () {
          $rootScope.$broadcast('auth-state-changed', {loggedIn: true});
        },1)
      } else {
        console.log("Logged Out");
        $rootScope.$broadcast('auth-state-changed', {loggedIn: false});
      }
    });

    function getUserObject() {
      return userObj || firebase.auth().currentUser;
    }

    function signOutUser() {
      return firebase.auth().signOut()
        .then(function (res) {
          return res;
        })
    }

    return {
      signOutUser: signOutUser,
      getUserObject: getUserObject
    }
  }

})();
