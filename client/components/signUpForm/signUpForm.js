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

  signUpFormCtrl.$inject = ['$mdDialog', "UserSvc" ,"G","FB","EMAIL_PASS" ];
  function signUpFormCtrl($mdDialog, UserSvc ,G,FB,EMAIL_PASS) {
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
      UserSvc.login(FB)
        .then(function (res) {
          $mdDialog.hide();
          console.log('FB user', res);
        })
        .catch(function (error) {
          console.log("Error signing in with FB", error);
        });
    };

    ctrl.googleLogin = function () {
      UserSvc.login(G)
        .then(function (res) {
          $mdDialog.hide();
          console.log(res);
        })
        .catch(function (error) {
          console.log("Error signing in with Google", error);
        });
    };

    ctrl.emailPassCreate = function () {
      UserSvc.signUpUserEmailPass(ctrl.userObj)
        .then(function(res){
          $mdDialog.hide();
        })
        .catch(function(error){
          console.log("Error creating user email + auth",error);
          var errorCode = error.code;
          var errorMessage = error.message;
        });
    };
    ctrl.passwordConfirmationCheck = function()
    {
      return ctrl.userObj.password === ctrl.passwordConfirm;
    }
    ctrl.emailPassLogin = function () {
      console.log(ctrl.userObj);
      UserSvc.login(EMAIL_PASS,ctrl.signInObj)
        .then(function(res){
          $mdDialog.hide();
        })
        .catch(function(error){
          console.log("Error creating user email + auth",error);
          var errorCode = error.code;
          var errorMessage = error.message;
        });
    };


    // End of Controller

  }
})();
