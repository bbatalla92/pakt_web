(function () {
  'use strict';
  angular.module('app')
    .component("messages", {
      templateUrl: 'app/messages/messages.html',
      controller: messagesCtrl
    })
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
        .state('messages',
          {
            url: '/messages',
            template: '<messages></messages>'
          }
        );
    }]);

  messagesCtrl.$inject = ["$mdMedia"];

  function messagesCtrl($mdMedia) {
    var ctrl = this;

    ctrl.bsActive = false;

    ctrl.conversations = [
      {
        id:1,
        firstName:"John",
        lastName:"Quinn",
        photoURL:'https://firebasestorage.googleapis.com/v0/b/pakt-f51bc.appspot.com/o/profileImages%2F-67847405?alt=media&token=8a5a6445-c787-4c17-8928-4e5ea11a74e8',
        lastMessageDate: new Date()
      },{
        id:2,
        firstName:"Tom",
        lastName:"Panaro",
        photoURL:'https://firebasestorage.googleapis.com/v0/b/pakt-f51bc.appspot.com/o/profileImages%2F-195020308?alt=media&token=a1ce0426-5bc6-40b8-9255-1b00c23686ce',
        lastMessageDate: "May 30, 2017"
      }
    ];



    ctrl.activeConversation = undefined;

    ctrl.sendMessage = function(){
      console.log("MESSAGE SENT");
    };

    ctrl.messageItemClicked = function(conversation){
      ctrl.activeConversation = conversation;



      if($mdMedia('xs') || $mdMedia('sm')){
        ctrl.bsActive = true;
      }
    }


  }
})();
