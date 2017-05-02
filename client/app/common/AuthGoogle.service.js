/**
 * Created by bbatal200 on 5/1/17.
 */
(function () {
  'use strict';


  angular.module('app')
    .factory("AuthGoogleSvc", AuthGoogleSvc);

  AuthGoogleSvc.$inject = [];

  function AuthGoogleSvc() {
    var providerG = new firebase.auth.GoogleAuthProvider();
    providerG
      .addScope('https://www.googleapis.com/auth/plus.login')
      .addScope('https://www.googleapis.com/auth/userinfo.profile	')
      .addScope('https://www.googleapis.com/auth/userinfo.email	');

    var userObj;
    var token;


    function signInUser() {
      return firebase.auth().signInWithPopup(providerG)
        .then(function (result) {
          token = result.credential.accessToken;
          userObj = result.user.providerData && result.user.providerData[0];
          return userObj;
        }).catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    }

    return {
      signInUser: signInUser
    }
  }

})();
