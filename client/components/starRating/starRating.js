/*Attributes
*
* rating: betweeen 0 and 5
* readOnly: True/False
* size: enum[sm,md,lg,xlg]
*
* */

(function () {
  'use strict';

  angular.module('app')
    .component("starRating", {
      templateUrl: 'components/starRating/starRating.html',
      controller: starRatingCtrl,
      bindings: {
        rating: "<",
        readOnly: "<",
        size: "<",
        reviews: "@"
      }
    });

  starRatingCtrl.$inject = ['$timeout'];

  function starRatingCtrl($timeout) {
    var ctrl = this;
    ctrl.starRatingArray = ['star_border', 'star_border', 'star_border', 'star_border', 'star_border'];
    const maxRate = 5;
    ctrl.starStyleObject = {
      'color': 'black',
      'margin-right': '22px'
    };

    ctrl.starSize = {
      sm: '20',
      md: '24',
      lg: '32',
      xlg: '48'
    };

    $timeout(function() {
      for (var i = 0; i < Math.floor(parseFloat(ctrl.rating)); i++) {
        ctrl.starRatingArray[i] = 'star';
      }
      if (parseFloat(ctrl.rating) - Math.floor(parseFloat(ctrl.rating)) > 0 && parseFloat(ctrl.rating) < 5) {
        var index = Math.floor(parseFloat(ctrl.rating));
        ctrl.starRatingArray[index] = 'star_half';
      }

        switch(ctrl.size){
          case 'sm':
            ctrl.starStyleObject['margin-right'] = '-5px';
                break;
          case 'md':
            ctrl.starStyleObject['margin-right'] = '0px';
            break;
          case 'lg':
            ctrl.starStyleObject['margin-right'] = '8px';
            break;
          case 'xlg':
            ctrl.starStyleObject['margin-right'] = '22px';
            break;
        }


    }, 1);


  }

})();
