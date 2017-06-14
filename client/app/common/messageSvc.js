/**
 * Created by bbatal200 on 5/1/17.
 */
(function () {
  "use strict";

  angular.module('app')
    .factory("MessageSvc", UserSvc);

  UserSvc.$inject = ["$timeout", "UserSvc", "$q", "$rootScope"];

  function UserSvc($timeout, UserSvc, $q, $rootScope) {

    var convoRef = firebase.database().ref("conversation");
    var messageRef = firebase.database().ref("message");
    var userObj = UserSvc.getCurrentUser();

    function createConversation(conversation, targetUser, convoId) {
      return convoRef.child(convoId).set(conversation)
        .then(function(res){
          return UserSvc.setConversationId(userObj, convoId);
        })
        .then(function(){
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

      messageRef.child(convoId).on('value', function (res) {
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

    function doesConversationExist(targetUser){
      for(var key in userObj.conversations){
        console.log(targetUser);
        if(key.includes(targetUser.uid)){
          return key;
        }
      }
      return false;
    }

    function sendMessage(message, conversation) {
      if(conversation.id){
        return messageRef.child(conversation.id).push(message);
      }else{
        var convoId = userObj.uid +''+ conversation.targetUser.uid;
        return messageRef.child(convoId).push(message)
          .then(function(res){
            var convo = {
              lastMessageId: res.key,
              startDate: message.timeSent
            };
            return createConversation(convo, conversation.targetUser, convoId)
          })
          .then(function(res){
            conversation.id = convoId;
            return 'success';
          })
      }


    }


    return {
      sendMessage: sendMessage,
      getMessage: getMessage,
      getMessages: getMessages,
      getConversations: getConversations,
      createConversation: createConversation,
      doesConversationExist:doesConversationExist
    }


  }

})();