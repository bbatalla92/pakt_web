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

  profileEditCtrl.$inject = ["APP_NAME", "UserSvc", "$mdDialog", "$mdMedia","$scope"];
  function profileEditCtrl(APP_NAME, UserSvc, $mdDialog, $mdMedia, $scope) {
    var ctrl = this;
    ctrl.image = "";
    ctrl.showImage = true;

    function bootstrap() {
      ctrl.userObj = UserSvc.getCurrentUser();
    }

    ctrl.onImageLoaded = function (img) {

      $mdDialog.show(
        {
          template: '<image-crop-dialog image="img"></image-crop-dialog>',
          controller: ["image", "$scope",function (image, $scope) {
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
            .then(function(res){
              console.log("Image Resilt", res);
            });
        })
        .catch(function (error) {
          console.log("Error", error);
        });
    };


    // End of the controller
    bootstrap();
    ctrl.$onDestroy = function(){$mdDialog.cancel()};
    $scope.$on('user-object-updated', function (event, args) {
      ctrl.userObj = args.user;
      ctrl.showImage = true;
      $scope.$apply();
    });

  }
})();
