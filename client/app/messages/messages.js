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



    ctrl.sendMessage = function(){
      console.log("MESSAGE SENT");
    };

    ctrl.messageItemClicked = function(){
      if($mdMedia('xs') || $mdMedia('sm')){
        ctrl.bsActive = true;
      }
    }


  }
})();
