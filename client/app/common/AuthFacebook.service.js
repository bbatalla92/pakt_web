/**
 * Created by bbatal200 on 5/1/17.
 */
"use strict";
(function () {

  angular.module('app')
    .factory("AuthFBSvc", AuthEmailPassSvc);

  AuthEmailPassSvc.$inject = [];

  function AuthEmailPassSvc() {
    var providerFB = new firebase.auth.FacebookAuthProvider();
    var token;
    var userObj = {};


    providerFB
      .addScope("email")
      .addScope("user_birthday")
      .addScope("user_location");


    function signInUser() {
      return firebase.auth().signInWithPopup(providerFB)
        .then(function (result) {
          console.log('service', result);
          token = result.credential.accessToken;
          userObj = result.user.providerData && result.user.providerData[0];
          return userObj;
        }).catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          var credential = error.credential;
        });
    }

    return {
      signInUser: signInUser
    }
  }

})();
