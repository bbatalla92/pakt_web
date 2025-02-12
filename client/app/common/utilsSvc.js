/**
 * Created by bbatal200 on 5/4/17.
 */

(function () {
  "use strict";

  angular.module('app')
    .factory("UtilsSvc", UtilsSvc)
    .directive('fileInput', function ($parse) {
      return {
        restrict: 'A',
        link: function (scope, element, attrs, ctrl) {
          var onChange = $parse(attrs.onChange);
          var reader = new FileReader();
          var image;
          var listener = function () {
            scope.$apply(function () {
              reader.addEventListener("load", function () {
                image = reader.result;
                if (image) {
                  scope.$ctrl.onImageLoaded(image);
                }
                reader = new FileReader();
                element[0].files[0].value = null;

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
    })
    .directive('disabletap', function ($timeout) {
      return {
        link: function () {
          $timeout(function () {
            var container = document.getElementsByClassName('pac-container');
            // disable ionic data tab
            angular.element(container).attr('data-tap-disabled', 'true');
            // leave input field if google-address-entry is selected
            angular.element(container).on("click", function () {
              document.getElementById('type-selector').blur();
            });

          }, 500);

        }
      };
    })
    .factory('NetInterceptor', function () {
      var interceptorFactory = {};

      interceptorFactory.xhrRefCount = 0;

      interceptorFactory.request = function (config) {
        //console.log("sent Req");
        ++interceptorFactory.xhrRefCount;
        return config;
      };
      interceptorFactory.response = function (resp) {
      //  console.log("recieved Res");
        --interceptorFactory.xhrRefCount;
        return resp;
      };

      return interceptorFactory;
    })
    .config(function ($httpProvider) {
      $httpProvider.interceptors.push('NetInterceptor');
    });

  UtilsSvc.$inject = ["$q", "$http", "G_API_KEY", "$sce", "$mdToast"];

  function UtilsSvc($q, $http, G_API_KEY, $sce, $mdToast) {

    var userLocation = {};
    setLocation();

    function getPosition(position) {
      var geocoder = new google.maps.Geocoder();

      if (position.coords.latitude) {
        userLocation.lat = position.coords.latitude;
        userLocation.lng = position.coords.longitude;
        geocoder.geocode({'location': userLocation}, function (results, status) {
          if (status === 'OK') {
            userLocation.address = results[0]["formatted_address"]
          }
        });
      }
    }

    function sortImages(imageData) {
      var images = [];
      if (!imageData.length) return [];

      var map = {};
      var i;
      for (i = 0; i < imageData.length; i++) {
        if (imageData[i])
          map[imageData[i].metaData.customMetadata.order] = imageData[i].image;
      }

      for (i = 0; i < imageData.length; i++) {
        if (map[i])
          images.push(map[i]);
      }
      return images;
    }

    function hashString(string) {
      var str = string;
      var hash = 0;
      if (str.length == 0) return hash;
      for (var i = 0; i < str.length; i++) {
        var char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
      }
      return hash;
    }

    function hashStringWithTimeStamp(string) {
      var str = string + (new Date()).getTime();
      var hash = 0;
      if (str.length == 0) return hash;
      for (var i = 0; i < str.length; i++) {
        var char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
      }
      return hash;
    }

    function downloadImageFromUrl(url) {
      var q = $q.defer();
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = function () {
        q.resolve(xhr.response);
      };
      xhr.open('GET', url);
      xhr.send();

      return q.promise;
    }

    function getUserLocation() {
      if (!Object.keys(userLocation).length) {
        setLocation();
      }

      return userLocation
    }

    function setLocation() {
      navigator.geolocation.getCurrentPosition(getPosition);
    }

    function toast(message, parentEl) {
      var el = document.getElementById(parentEl || 'toolbarAnchorId');
      $mdToast.show(
        $mdToast.simple()
          .textContent(message)
          .position('bottom right')
          .hideDelay(3000)
          .parent(el)
      );
    }

    return {
      sortImages: sortImages,
      hashString: hashString,
      hashStringWithTimeStamp: hashStringWithTimeStamp,
      downloadImageFromUrl: downloadImageFromUrl,
      getUserLocation: getUserLocation,
      toast: toast
    }
  }

})();
