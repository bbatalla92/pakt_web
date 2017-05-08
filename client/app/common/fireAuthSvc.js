/**
 * Created by bbatal200 on 5/1/17.
 */
(function () {
  "use strict";

  angular.module('app')
    .factory("FireAuth", AuthEmailPassSvc);

  AuthEmailPassSvc.$inject = ["$timeout", "$rootScope", "$firebaseAuth", "G", "FB", "EMAIL_PASS"];

  function AuthEmailPassSvc($timeout, $rootScope, $firebaseAuth, G, FB, EMAIL_PASS) {

    var providerG = new firebase.auth.GoogleAuthProvider();

    providerG
      .addScope('https://www.googleapis.com/auth/plus.login')
      .addScope('https://www.googleapis.com/auth/userinfo.profile')
      .addScope('https://www.googleapis.com/auth/plus.me')
      .addScope('https://www.googleapis.com/auth/user.addresses.read')
      .addScope('https://www.googleapis.com/auth/user.birthday.read')
      .addScope('https://www.googleapis.com/auth/user.phonenumbers.read')
      .addScope('https://www.googleapis.com/auth/userinfo.email	');

    var providerFB = new firebase.auth.FacebookAuthProvider();
    providerFB
      .addScope("email")
      .addScope("user_birthday")
      .addScope("user_location");

    function createUserEmailPassword(userObj) {
      return firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
        .then(function (res) {
          return res;
        })
        .catch(function (error) {
          console.log(error);
          return {error: error}
        });
    }

    function login(type, data) {
      var func;
      var provider;

      if (type === G) {
        provider = providerG;
        func = $firebaseAuth().$signInWithPopup
      }
      else if (type === FB) {
        provider = providerFB;
        func = $firebaseAuth().$signInWithPopup
      }
      else if (type === EMAIL_PASS) {
        return $firebaseAuth().$signInWithEmailAndPassword(data.email, data.password);
      }
      else {
        return $q.reject();
      }

      return func(provider)
        .then(function (res) {
          return res;
        })
        .catch(function (error) {
          console.error("error", error);
          return error;
        })
    }

    function signInWithCredentials(credential) {
      console.log("Cred", credential);

      return $firebaseAuth.$signInWithCredential(credential)
        .then(function (res) {
          return res
        })
    }


    return {
      createUserEmailPassword: createUserEmailPassword,
      login: login,
      signInWithCredentials: signInWithCredentials
    }
  }

})();
