'use strict';

(function(){


angular.module('app')
  .component("homeItemSearchBar",{
    templateUrl: 'components/homeItemSearchBar/homeItemSearchBar.html',
    controller: homeItemSearchBarCtrl
  });


  function homeItemSearchBarCtrl(){
    var ctrl = this;

    ctrl.searchParams = {
      keyword: "",
      location: "",
      startDate: new Date(),
      endDate: new Date()
    }

  }


})();
