'use strict';

(function () {


  angular.module('app')
    .component("messagingContainer", {
      templateUrl: 'components/messagingContainer/messagingContainer.html',
      controller: messagingContainerCtrl,
      bindings: {
        conversation: "="
      }
    });

  messagingContainerCtrl.$inject = ["$timeout"];
  function messagingContainerCtrl($timeout) {
    var ctrl = this;

    $timeout(function(){
      console.log("CONVO", ctrl.conversation);

    }, 1)
  }

})();
