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
          var model = $parse(attrs.fileInput);
          var onChange = $parse(attrs.onChange);
          var reader = new FileReader();
          var image;
          var listener = function () {
            scope.$apply(function () {
              reader.addEventListener("load", function () {
                image = reader.result;
                //model.assign(scope, image);
               // attrs.fileInput()
                scope.$ctrl.onImageLoaded(image);
                reader = new FileReader();
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

    UtilsSvc.$inject = ["$q"];

    function UtilsSvc($q){



      function sortImages(imageData){
        var images = [];
        if(!imageData.length) return [];

        var map = {};
        var i;
        for(i = 0; i < imageData.length; i++){
          map[imageData[i].metaData.customMetadata.order] = imageData[i].image;
        }

        for(i = 0; i < imageData.length; i++){
          images.push(map[i]);
        }
        return images;
      }

      function hashString(string){
        var str = string;
        var hash = 0;
        if (str.length == 0) return hash;
        for (var i = 0; i < str.length; i++) {
          var char = str.charCodeAt(i);
          hash = ((hash<<5)-hash)+char;
          hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
      }

      function hashStringWithTimeStamp(string){
        var str = string + (new Date()).getTime();
        var hash = 0;
        if (str.length == 0) return hash;
        for (var i = 0; i < str.length; i++) {
          var char = str.charCodeAt(i);
          hash = ((hash<<5)-hash)+char;
          hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
      }

      function downloadImageFromUrl(url){
        var q = $q.defer();
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function() {
          q.resolve(xhr.response);
        };
        xhr.open('GET', url);
        xhr.send();

        return q.promise;
      }

      return {
        sortImages:sortImages,
        hashString:hashString,
        hashStringWithTimeStamp:hashStringWithTimeStamp,
        downloadImageFromUrl:downloadImageFromUrl
      }
    }

}
)();
