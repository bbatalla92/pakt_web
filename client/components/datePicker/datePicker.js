'use strict';

(function () {


  angular.module('app')
    .component("datePicker", {
      templateUrl: 'components/datePicker/datePicker.html',
      controller: datePickerCtrl
    });

  datePickerCtrl.$inject = ["$scope", "$state", "$mdDialog"];
  function datePickerCtrl($scope, $state, $mdDialog) {
    var ctrl = this;

    ctrl.minDate = new Date();
    ctrl.maxDate = new Date();
    ctrl.maxDate.setMonth(ctrl.maxDate.getMonth() + 6);
    ctrl.date;
    ctrl.startDate = '';
    ctrl.endDate = '';
    ctrl.activeDate = "start";


    ctrl.onDateSelect = function () {

      if (ctrl.activeDate === "start") {
        ctrl.startDate = ctrl.date;
        ctrl.minDate = ctrl.startDate;
        ctrl.activeDate = "end";
      } else {
        ctrl.endDate = ctrl.date;
        $mdDialog.hide([ctrl.startDate, ctrl.endDate])

      }
    }


  }

})();
