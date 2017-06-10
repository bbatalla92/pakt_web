'use strict';

(function () {


  angular.module('app')
    .component("messagingContainer", {
      templateUrl: 'components/messagingContainer/messagingContainer.html',
      controller: messagingContainerCtrl,
      bindings: {
        conversation: "<"
      }
    });

  messagingContainerCtrl.$inject = ["MessageSvc", "UserSvc", "$timeout", "$scope"];
  function messagingContainerCtrl(MessageSvc, UserSvc, $timeout, $scope) {
    var ctrl = this;


    ctrl.messageText = '';
    ctrl.userObj = UserSvc.getCurrentUser();
    const DAY_IN_MS = 86400000;
    const HOUR_IN_MS = 60 * 60 * 1000;
    const MIN_IN_MS = 60 * 1000;
    var todaysDate = (new Date()).getTime();


    ctrl.sendMessage = function () {
      if (!ctrl.messageText) return;

      var message = {
        message: ctrl.messageText,
        timeSent: (new Date()).getTime(),
        senderId: ctrl.userObj.uid
      };

      MessageSvc.sendMessage(message, ctrl.conversation.id)
        .then(function (res) {
          console.log("Message Sent");
          ctrl.messageText = '';
          $timeout(function () {
            document.getElementById('messagesInnerContainer').scrollTop = document.getElementById('messagesInnerContainer').scrollHeight
          }, 1)
        })
    };

    ctrl.getMessages = function () {
      ctrl.conversation.messages = [];
      return MessageSvc.getMessages(ctrl.conversation.id, ctrl.conversation)
        .then(function () {
        })
        .finally(function () {
            $timeout(function () {
              document.getElementById('messagesInnerContainer').scrollTop = document.getElementById('messagesInnerContainer').scrollHeight
            }, 1)
          }
        );
    };

    ctrl.daydiff = function (mDate) {
      var diff = todaysDate - mDate;
      var days = Math.floor(diff / DAY_IN_MS);

      if (days > 1) {
        return days + ' days ago'
      }

      if (days > 30) {
        return mDate
      }

      var hourDiff = (diff % DAY_IN_MS);
      var hours = Math.floor(hourDiff / HOUR_IN_MS);

      if (hours > 1) {
        return hours + ' hours ago'
      }

      var hoursDiff = hourDiff % HOUR_IN_MS;
      var minutes = Math.floor(hoursDiff / MIN_IN_MS);

      if (minutes > 1) {
        return minutes + ' minutes ago'
      }

      return "Just Now";
    };

    ctrl.$onInit = ctrl.getMessages;

  }

})();
