'use strict';

(function(){


angular.module('app')
  .component("itemCarouselTemplate",{
    templateUrl: 'components/itemCarouselTemplate/itemCarouselTemplate.html',
    controller: itemCarouselTemplateCtrl,
    bindings:{
      item: "<"
    }
  });


  function itemCarouselTemplateCtrl(){
    var ctrl = this;





  }


})();
