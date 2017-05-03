/**
 * Created by bbatal200 on 5/1/17.
 */
(function () {
  "use strict";

  angular.module('app')
    .factory("AuthEmailPassSvc", AuthEmailPassSvc);

  AuthEmailPassSvc.$inject = [];

  function AuthEmailPassSvc() {

    function createUser(userObj) {
      return firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
        .then(function (res) {
          console.log("user Created", res);
          return res;
        });
    }

    function signInUser(userObj) {

      return firebase.auth().signInWithEmailAndPassword(userObj.email, userObj.password)
        .then(function (res) {
          return res;
        })
    }

    return {
      createUser: createUser,
      signInUser: signInUser
    }
  }

})();
