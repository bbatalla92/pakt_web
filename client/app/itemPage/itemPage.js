(function () {
  'use strict';
  angular.module('app')
    .component("itemPage", {
      templateUrl: 'app/itemPage/itemPage.html',
      controller: itemPageCtrl
    })
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
        .state('item',
          {
            url: '/item/:id',
            template: '<item-page></item-page>',
            params: {
              item: null
            }
          }
        );
    }]);

  itemPageCtrl.$inject = ["$stateParams", '$scope', '$window', "$timeout", "G_API_KEY", "$mdMedia", "ItemSvc", "MessageSvc"];

  function itemPageCtrl($stateParams, $scope, $window, $timeout, G_API_KEY, $mdMedia, ItemSvc, MessageSvc) {
    var ctrl = this;

    ctrl.flags = {
      mapInitialized: false
    };
    ctrl.item = $stateParams.item;

    ctrl.dynamicStyleClass = {stickyForm: false};
    ctrl.rentalDuration = "hour";
    ctrl.totalPrice = "";
    ctrl.rentalForm = {
      rentalDuration: "hour",
      totalPrice: "",
      startDate: '',
      endDate: ''
    };
    ctrl.minDate = new Date();

    // ___________ Functions below ____________
    function bootstrap() {
      getItem();
      initMap();
    }

    ctrl.conversation = {};

    ctrl.messageOwner = function () {
      var convoId = MessageSvc.doesConversationExist(ctrl.item.owner);
      ctrl.conversation = {
        targetUser: ctrl.item.owner
      };
      if (convoId) {
        console.log(convoId);
        ctrl.conversation = {
          id: convoId,
          targetUser: ctrl.item.owner
        };
      } else {
        ctrl.conversation = {
          targetUser: ctrl.item.owner
        };
      }

      ctrl.bsActive = true

    };

    function initMap() {
      var mapBaseUrl = 'https://maps.googleapis.com/maps/api/staticmap?zoom=12&scale=4';
      var key = "key=" + G_API_KEY;
      var marker = "markers=icon:https://goo.gl/52bjtg|39.835700,%20-74.187158";
      var center = "center=" + "39.835700,%20-74.187158";
      var size = "size=1200x200";

      if ($mdMedia("xs")) {
        size = "size=1200x300";
      }

      ctrl.mapUrl = mapBaseUrl + "&" + center + "&" + size + "&" + marker + "&" + key;


      /*  ctrl.map = new google.maps.Map(document.getElementById('map'), {
       center: {lat: 39.9525839, lng: -75.16522150000003},
       zoom: 12,
       disableDefaultUI: true,
       scrollwheel: false
       });

       new google.maps.Circle({
       strokeColor: '#FF0000',
       strokeOpacity: 0.8,
       strokeWeight: 2,
       fillColor: '#C58DA1',
       fillOpacity: 0.35,
       map: ctrl.map,
       center: {lat: 39.944296, lng: -75.169242},
       radius: 600
       });*/
    }

    ctrl.calculateTotal = function () {
      if (ctrl.rentalForm.startDate && ctrl.rentalForm.endDate) {
        var diffDates = calculateDaysDiff(ctrl.rentalForm.startDate, ctrl.rentalForm.endDate);

        if (diffDates != 0) {
          console.log(diffDates);
          ctrl.rentalForm.totalPrice = Math.floor(diffDates / 7) * ctrl.item.price['week'] + Math.floor(diffDates % 7) * ctrl.item.price['day'];
        } else {
          ctrl.rentalForm.totalPrice = ctrl.rentalForm.hours * ctrl.item.price['hour'];
        }
      }
    };

    var calculateDaysDiff = function (startDate, endDate) {
      //Get 1 day in milliseconds
      var one_day = 1000 * 60 * 60 * 24;
      var date1 = new Date(startDate);
      var date2 = new Date(endDate);

      // Convert both dates to milliseconds
      var date1_ms = date1.getTime();
      var date2_ms = date2.getTime();

      // Calculate the difference in milliseconds
      var difference_ms = date2_ms - date1_ms;

      // Convert back to days and return
      return Math.round(difference_ms / one_day);
    };

    function getItem() {
      ItemSvc.getItem($stateParams.id)
        .then(function (res) {
          ctrl.item = res;
          $scope.$apply();
        })
        .catch(function(error){
          console.log("Error getting item", error)
        })
    }

    angular.element($window).bind("scroll", function () {
      ctrl.dynamicStyleClass.stickyForm = this.pageYOffset >= 490 && this.pageYOffset < 1900;
      ctrl.dynamicStyleClass.stuckFormBottom = this.pageYOffset >= 1900;

      if (this.pageYOffset > 1500 && !ctrl.flags.mapInitialized) {
        ctrl.flags.mapInitialized = true;
        initMap();
      }

      $scope.$apply();
    });

    // End of Controller
    $timeout(function () {
      bootstrap()
    }, 1);
  }
})();
