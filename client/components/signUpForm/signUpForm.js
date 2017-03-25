'use strict';

(function(){


  var signUpFormCtrl = function($mdDialog){
    var ctrl = this;


    ctrl.closeDialog = function(){
      console.log('close');
      $mdDialog.cancel();
    };


  };

angular.module('app')
  .component("signUpForm",{
    templateUrl: 'components/signUpForm/signUpForm.html',
    controller: signUpFormCtrl
  });

  signUpFormCtrl.$inject = ['$mdDialog'];



})();
