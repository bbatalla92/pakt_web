/**
 * Created by bbatal200 on 5/1/17.
 */
(function () {
  "use strict";

  angular.module('app')
    .factory("MessageSvc", UserSvc);

  UserSvc.$inject = ["$firebaseObject", "UserSvc", "$q"];

  function UserSvc($firebaseObject, UserSvc, $q) {
    var convoRef = firebase.database().ref("conversation");
    var messageRef = firebase.database().ref("message");
    var userObj = UserSvc.getCurrentUser();

    function createConversation() {

    }

    function getConversations() {
      var promise = [];
      for (var key in  userObj.conversations) {
        if (userObj.conversations[key]) {
          promise.push(getConversation(key));
        }
      }
      return $q.all(promise);
    }

    function getConversation(id) {
      var conversation = {};
      return convoRef.child(id).once('value')
        .then(function (res) {
          conversation = res.val();
          conversation.id = id;
          return getMessage(id, conversation.lastMessageId);
        })
        .then(function (res) {
          // Get Last Message
          conversation.lastMessage = res;

          return UserSvc.getTargetUser(id.replace(userObj.uid, ''));
        })
        .then(function (res) {
          // Get Target User
          conversation.targetUser = res;
          return conversation;
        })
    }

    function getMessage(convoId, messageId) {
      var q = $q.defer();
      messageRef.child(convoId + '/' + messageId).once('value')
        .then(function (res) {
          q.resolve(res.val());
          return q.promise;
        });
      return q.promise;
    }

    function getMessages(convoId, convo) {
      var q = $q.defer();
      messageRef.child(convoId).on('value', function (res) {
        var arr = [];
        for (var key in res.val()) {
          arr.push(res.val()[key]);
        }
        arr.sort(function (a, b) {
          return a.timeSent - b.timeSent;
        });

        if (convo.messages.length) {
          convo.messages.push(arr[arr.length - 1])
        } else {
          for (var i = 0; i < arr.length; i++) {
            convo.messages.push(arr[i]);
          }
        }


        q.resolve("success");
        return q.promise;
      });
      return q.promise;
    }


    function sendMessage(message, convoId) {
      return messageRef.child(convoId).push(message);
    }


    return {
      sendMessage: sendMessage,
      getMessage: getMessage,
      getMessages: getMessages,
      getConversations: getConversations,
      createConversation: createConversation
    }


  }

})();
