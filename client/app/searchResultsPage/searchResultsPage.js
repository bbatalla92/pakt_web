'use strict';

(function(){


angular.module('app')
  .component("searchResultsPage",{
    templateUrl: 'app/searchResultsPage/searchResultsPage.html',
    controller: searchResultsPageCtrl
  })
  .config(['$stateProvider',function ($stateProvider) {
    $stateProvider
      .state('results', {
        url: '/results',
        template: '<search-results-page></search-results-page>'
      });
  }]);



  function searchResultsPageCtrl(){
    var ctrl = this;





  }


})();
