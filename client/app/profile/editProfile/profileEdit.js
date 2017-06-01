'use strict';

(function () {
  angular.module('app')
    .component("profileEdit", {
      templateUrl: 'app/profile/editProfile/profileEdit.html',
      controller: profileEditCtrl
    })
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
        .state('profile.edit', {
          template: '<profile-edit></profile-edit>'
        });
    }]);

  profileEditCtrl.$inject = ["APP_NAME", "UserSvc", "$mdDialog", "$mdMedia", "$scope"];
  function profileEditCtrl(APP_NAME, UserSvc, $mdDialog, $mdMedia, $scope) {
    var ctrl = this;
    ctrl.image = "";
    ctrl.showImage = true;


    var locationAutocomplete = new google.maps.places.Autocomplete(document.getElementById("address"));

    locationAutocomplete.addListener('place_changed', function () {
      var place = locationAutocomplete.getPlace();
      ctrl.userObj.location = {
        address: place.formatted_address,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };
      $scope.$apply();
    });

    function bootstrap() {
      ctrl.userObj = UserSvc.getCurrentUser();
    }

    //var phoneNumLength = 16;
    ctrl.onPhoneNumberChange = function () {
      if (!ctrl.userObj.phoneNumber || !ctrl.userObj.phoneNumber.length) return;

      // Following if statement tells if the recently added character is a number.
      if (isNaN(parseInt(ctrl.userObj.phoneNumber[ctrl.userObj.phoneNumber.length - 1]))) {
        console.log(ctrl.userObj.phoneNumber[ctrl.userObj.phoneNumber.length - 1]);
        ctrl.userObj.phoneNumber = ctrl.userObj.phoneNumber.slice(0, ctrl.userObj.phoneNumber.length - 1);
        return;
      }

      var num = ctrl.userObj.phoneNumber.replace(/[^0-9]/g, '');
      ctrl.userObj.phoneNumber = formatPhoneNumber(num);
    };

    function formatPhoneNumber(value) {
      var country, city, number;
      switch (value.length) {
        case 1:
        case 2:
        case 3:
          city = value;
          break;

        default:
          city = value.slice(0, 3);
          number = value.slice(3);
      }

      if (number) {
        if (number.length > 3) {
          number = number.slice(0, 3) + ' - ' + number.slice(3, 7);
        }
        else {
          number = number;
        }
        return ("( " + city + " ) " + number).trim();
      }
      else {
        return "( " + city;
      }
    }

    function stripPhoneFormat(number) {
      var num = number;
      if (num.includes('(')) {
        num = num.replace('(', '');
      }

      if (num.includes(')')) {
        num = num.replace(')', '');
      }

      if (num.includes(' ')) {
        num = num.replace(/ /g, '');
      }

      return num;
    }


    ctrl.onImageLoaded = function (img) {

      $mdDialog.show(
        {
          template: '<image-crop-dialog image="img"></image-crop-dialog>',
          controller: ["image", "$scope", function (image, $scope) {
            $scope.img = image;
          }],
          parent: angular.element(document.body),
          clickOutsideToClose: true,
          locals: {
            image: img
          },
          fullscreen: $mdMedia('xs')
        }
      )
        .then(function (imageResult) {
          ctrl.showImage = false;
          UserSvc.uploadMainImage(imageResult)
            .then(function (res) {
              console.log("Image Resilt", res);
            });
        })
        .catch(function (error) {
          console.log("Error", error);
        });
    };

    ctrl.save = function () {
      UserSvc.updateUser(ctrl.userObj);
    };

    // End of the controller
    bootstrap();
    ctrl.$onDestroy = function () {
      $mdDialog.cancel()
    };
    $scope.$on('user-object-updated', function (event, args) {
      ctrl.userObj = args.user;
      ctrl.showImage = true;
      $scope.$apply();
    });

  }
})();
