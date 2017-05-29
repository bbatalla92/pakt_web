'use strict';

(function () {


  angular.module('app')
    .component("messagingContainer", {
      templateUrl: 'components/messagingContainer/messagingContainer.html',
      controller: messagingContainerCtrl
    });

  messagingContainerCtrl.$inject = ["$scope", "$state", "$mdDialog"];
  function messagingContainerCtrl($scope, $state, $mdDialog) {
    var ctrl = this;

  }

})();
