(function () {
  'use strict';


  angular.module('app')
    .component("signUpForm", {
      templateUrl: 'components/signUpForm/signUpForm.html',
      controller: signUpFormCtrl,
      bindings:{
        isNew: "<"
      }
    });

  signUpFormCtrl.$inject = ['$mdDialog', 'AuthFBSvc', 'AuthGoogleSvc'];

  function signUpFormCtrl($mdDialog, AuthFBSvc, AuthGoogleSvc) {
    var ctrl = this;

    ctrl.closeDialog = function () {
      $mdDialog.cancel();
    };



    ctrl.faceBookLogin = function(){
      AuthFBSvc.signInUser()
        .then(function(res){
          console.log('FB user',res);
        })
        .catch(function(error){
          console.log("Error signing in with FB", error)
        })
    };

    ctrl.googleLogin = function(){
      AuthGoogleSvc.signInUser()
        .then(function(res){
          console.log(res)
        })
        .catch(function(error){
          console.log("Error signing in with Google", error)
        })
    };

    ctrl.emailPass = function(){

    };




    // End of Controller

  }
})();
