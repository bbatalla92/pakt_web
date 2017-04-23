'use strict';

(function () {


  angular.module('app')
    .component("review", {
      templateUrl: 'components/review/review.html',
      controller: reviewCtrl,
      bindings:{
        review: "<"
      }
    });


  function reviewCtrl() {
    var ctrl = this;

  }


})();
