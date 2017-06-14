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

  messagesCtrl.$inject = ["$mdMedia", "UserSvc", "MessageSvc", "UtilsSvc", "$scope"];

  function messagesCtrl($mdMedia, UserSvc, MessageSvc, UtilsSvc, $scope) {
    var ctrl = this;

    ctrl.userObj = UserSvc.getCurrentUser();
    ctrl.bsActive = false;
    ctrl.activeConversation = undefined;
    ctrl.conversations = [];

    function getConversations() {
      MessageSvc.getConversations()
        .then(function (res) {
          //console.log("Conversations", res);
          ctrl.conversations = res;
        })
        .catch(function (error) {
          console.log("Error", error);
          UtilsSvc.toast("There was an error retrieving messages")
        })
    }

    ctrl.messageItemClicked = function (conversation) {

      if ($mdMedia('xs') || $mdMedia('sm')) {
        ctrl.bsActive = true;
      }

      if (ctrl.activeConversation && ctrl.activeConversation.id === conversation.id) return;

      if (conversation.messages) {
        ctrl.activeConversation = conversation;
        return;
      }

      ctrl.activeConversation = conversation;
    };


    // bootstrap
    getConversations();
  }
})();
