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

  messagesCtrl.$inject = [];

  function messagesCtrl() {
    var ctrl = this;

    ctrl.sendMessage = function(){
      console.log("MESSAGE SENT");
    };

    ctrl.showBottomSheet = function(){

    }


  }
})();
