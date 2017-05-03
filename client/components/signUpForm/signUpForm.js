(function () {
  'use strict';


  angular.module('app')
    .component("signUpForm", {
      templateUrl: 'components/signUpForm/signUpForm.html',
      controller: signUpFormCtrl,
      bindings: {
        isNew: "<"
      }
    });

  signUpFormCtrl.$inject = ['$mdDialog', 'AuthFBSvc', 'AuthGoogleSvc', 'AuthEmailPassSvc', '$scope'];
  function signUpFormCtrl($mdDialog, AuthFBSvc, AuthGoogleSvc, AuthEmailPassSvc, $scope) {
    var ctrl = this;

    ctrl.closeDialog = function () {
      $mdDialog.cancel();
    };
    ctrl.userObj = {
      birthday: {month: "january", day: 1, year: undefined}
    };
    ctrl.signInObj = {};
    ctrl.flags = {
      signInError: false
    };


    // functions below

    ctrl.faceBookLogin = function () {
      AuthFBSvc.signInUser()
        .then(function (res) {
          $mdDialog.hide();
          console.log('FB user', res);
        })
        .catch(function (error) {
          console.log("Error signing in with FB", error);
        });
    };

    ctrl.googleLogin = function () {
      AuthGoogleSvc.signInUser()
        .then(function (res) {
          $mdDialog.hide();
          console.log(res);
        })
        .catch(function (error) {
          console.log("Error signing in with Google", error);
        });
    };

    ctrl.emailPassCreate = function () {
      AuthEmailPassSvc.createUser(ctrl.userObj)
        .then(function(res){
          console.log("res",res);

        })
        .catch(function(error){
          console.log("Error creating user email + auth",error);

          var errorCode = error.code;
          var errorMessage = error.message;
        });
    };

    ctrl.emailPassLogin = function () {
      AuthEmailPassSvc.signInUser(ctrl.signInObj)
        .then(function(res){
          console.log("res",res);
          $mdDialog.hide();
        })
        .catch(function(error){
          //console.log("form",$scope.loginform);
          ctrl.flags.signInError = true;

          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
        });
    };


    // End of Controller

  }
})();
