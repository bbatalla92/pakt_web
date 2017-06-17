/**
 * Created by bbatal200 on 5/1/17.
 */
(function () {
  "use strict";

  angular.module('app')
    .factory("MessageSvc", UserSvc);

  UserSvc.$inject = ["$timeout", "UserSvc", "$q", "$rootScope"];

  function UserSvc($timeout, UserSvc, $q, $rootScope) {

    var userConvoRef = firebase.database().ref("userConversations");
    var convoRef = firebase.database().ref("conversation");
    var messageRef = firebase.database().ref("message");
    var userObj = UserSvc.getCurrentUser();

    function createConversation(conversation, targetUser, convoId) {
      return convoRef.child(convoId).set(conversation)
        .then(function (res) {
          return UserSvc.setConversationId(userObj, convoId);
        })
        .then(function () {
          return UserSvc.setConversationId(targetUser, convoId);
        })
    }

    function getConversations() {
      var promise = [];
      for (var key in  userObj.conversations) {
        if (userObj.conversations[key]) {
          promise.push(getConversation(key));
        }
      }
      return $q.all(promise)
        .then(function(res){
          res.sort(function (a, b) {
            return b.lastMessage.timeSent - a.lastMessage.timeSent;
          });
          console.log(res);
          return res;
        });
    }

    function getConversation(id) {
      var conversation = {};
      return convoRef.child(id).once('value')
        .then(function (res) {
          conversation = res.val();
          conversation.id = id;

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

    function getMessages(convo) {
      if(convo.lastMessage.senderId !== userObj.uid){
        convoRef.child(convo.id).child('read').set(true);
      }

      messageRef.child(convo.id).on('value', function (res) {
        var arr = [];
        // @TODO - Change 'value' to 'child_added' event, but figure out duplicate issue first with child_added event
        for (var key in res.val()) {
          arr.push(res.val()[key]);
        }
        arr.sort(function (a, b) {
          return a.timeSent - b.timeSent;
        });
        convo.messages = arr;
        $timeout(function () {
          if (!$rootScope.$$phase) {
            $rootScope.$apply();
          }
          document.getElementById('messagesInnerContainer').scrollTop = document.getElementById('messagesInnerContainer').scrollHeight;
        }, 1);
      });

    }

    function doesConversationExist(targetUser) {
      for (var key in userObj.conversations) {
        console.log(targetUser);
        if (key.includes(targetUser.uid)) {
          return key;
        }
      }
      return false;
    }

    function sendMessage(message, conversation) {
      message.timeSent = firebase.database.ServerValue.TIMESTAMP;

      if (conversation.id) {
        conversation.read = false;
        convoRef.child(conversation.id).child("lastMessage").set(message);
        convoRef.child(conversation.id).child("read").set(false);
        return messageRef.child(conversation.id).push(message);
      } else {
        var convoId = userObj.uid + '' + conversation.targetUser.uid;
        return messageRef.child(convoId).push(message)
          .then(function (res) {
            var convo = {
              lastMessage: message,
              created: message.timeSent,
              read: false
            };
            return createConversation(convo, conversation.targetUser, convoId)
          })
          .then(function (res) {
            conversation.id = convoId;
            return 'success';
          })
      }
    }

    function setConversationId(user, convoId) {
      return userConvoRef.child(user.uid).child(convoId).set(true);
    }


    return {
      sendMessage: sendMessage,
      getMessage: getMessage,
      getMessages: getMessages,
      getConversations: getConversations,
      createConversation: createConversation,
      doesConversationExist: doesConversationExist
    }
  }

})();
