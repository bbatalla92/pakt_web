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
        timeSent: firebase.database.ServerValue.TIMESTAMP,
        senderId: ctrl.userObj.uid
      };
      ctrl.messageText = '';

      MessageSvc.sendMessage(message, ctrl.conversation)
        .then(function (res) {
        });
    };

    ctrl.getMessages = function () {
      ctrl.conversation.messages = [];
      if (ctrl.conversation.id) {
        MessageSvc.getMessages(ctrl.conversation);
      }
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

    $scope.$watch('$ctrl.conversation.id', function () {
      ctrl.getMessages();
    })
  }

})();
