/**
 * Created by Lars on 19-6-2015.
 */
    // Show graph onclick
'use strict';
angular.module('org.open-doors')
    .controller('OpenDialogController', OpenDialogController);

OpenDialogController.$inject = ['$scope', '$mdDialog', 'dialogService'];
function OpenDialogController($scope, $mdDialog, dialogService) {
    // Add body
    $scope.dialogService = dialogService;

    // Show graph for parking density and temperature for the last 24 hours
    $scope.showGraph = function (garagename) {
        $scope.dialogService.getParkingData(garagename);

        //show a dialog
        $mdDialog.show({
            controller: 'DialogController',
            templateUrl: 'js/dialog/dialog.tpl.html',
            parent: angular.element(document.body),
        });
    };

}