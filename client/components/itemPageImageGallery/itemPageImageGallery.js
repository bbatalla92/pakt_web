'use strict';

(function(){


angular.module('app')
  .component("itemPageImageGallery",{
    templateUrl: 'components/itemPageImageGallery/itemPageImageGallery.html',
    controller: itemPageImageGalleryCtrl,
    bindings:{
      images: "<"
    }
  });


  function itemPageImageGalleryCtrl(){
    var ctrl = this;





  }


})();
