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
            template: '<messages></messages>',
            resolve: {
              "currentAuth": ["$firebaseAuth", function ($firebaseAuth) {
                // $requireSignIn returns a promise so the resolve waits for it to complete
                // If the promise is rejected, it will throw a $stateChangeError (see above)
                return $firebaseAuth().$requireSignIn();
              }]
            }
          }
        );
    }]);

  /*@ngInject*/
  function messagesCtrl($mdMedia, UserSvc, MessageSvc, UtilsSvc, $scope) {
    var ctrl = this;

    ctrl.userObj = UserSvc.getCurrentUser();

    ctrl.bsActive = false;
    ctrl.activeConversation = undefined;
    ctrl.conversations = {};

    function getConversations() {
      MessageSvc.getConversations(ctrl.conversations);
    }

    ctrl.conversationClicked = function (conversation) {
      if (conversation.lastMessage.senderId !== ctrl.userObj.uid && !conversation.read) {
        conversation.read = true;
      }

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
    if (ctrl.userObj.uid) {
      getConversations();
    }

    $scope.$on('user-object-updated', function (event, args) {
      if (args.user && args.user.uid) { //&& !ctrl.userObj.uid || ctrl.userObj.conversations.length !== args.user.conversations.length) {
        ctrl.userObj = args.user;
        getConversations();
      }
    })
  }
})();
