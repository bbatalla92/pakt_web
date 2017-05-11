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
    }])
    .directive('fileInput', function ($parse) {
      return {
        restrict: 'A',
        link: function (scope, element, attrs, ctrl) {
          var model = $parse(attrs.fileInput);
          var onChange = $parse(attrs.onChange);
          var reader = new FileReader();
          var image;
          var listener = function () {
            scope.$apply(function () {
              reader.addEventListener("load", function () {
                image = reader.result;
                model.assign(scope, image);
              }, false);

              if (element[0].files[0]) {
                reader.readAsDataURL(element[0].files[0]);
              }

              onChange(scope);
            });
          };
          element.on('change', listener);
        }
      }
    });

  profileEditCtrl.$inject = ["APP_NAME", "UserSvc", "$mdDialog", "$mdMedia","$scope"];
  function profileEditCtrl(APP_NAME, UserSvc, $mdDialog, $mdMedia, $scope) {
    var ctrl = this;
    ctrl.image = "";
    ctrl.showImage = true;

    $scope.$on('user-object-updated', function (event, args) {
      ctrl.user = args.user;
      ctrl.showImage = true;
      $scope.$apply();
    });

    function bootstrap() {
      ctrl.userObj = UserSvc.getCurrentUser();
    }

    ctrl.openImageCropDialog = function (event) {

      $mdDialog.show(
        {
          template: '<image-crop-dialog image="img"></image-crop-dialog>',
          controller: ["image", "$scope",function (image, $scope) {
            $scope.img = image;
          }],
          parent: angular.element(document.body),
          targetEvent: event,
          clickOutsideToClose: true,
          locals: {
            image: ctrl.image
          },
          fullscreen: $mdMedia('xs')
        }
      )
        .then(function (imageResult) {
         // console.log("Image Resilt", imageResult)
          UserSvc.uploadMainImage(imageResult);
          ctrl.showImage = false;
        })
        .catch(function () {

        });
    };


    // End of the controller
    bootstrap();
    ctrl.$onDestroy = function(){$mdDialog.cancel()};
  }
})();
