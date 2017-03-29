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
        template: '<search-results-page></search-results-page>',
        params: {
          searchParams: null
        }
      });
  }]);

  searchResultsPageCtrl.$injector = ['$stateParams'];

  function searchResultsPageCtrl($stateParams){
    var ctrl = this;
    ctrl.searchParams = $stateParams.searchParams;
  }


})();
