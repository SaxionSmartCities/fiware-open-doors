/**
 * Created by Ruben on 17-6-2015.
 */
angular.module('org.open-doors')
    .controller('DialogController', DialogController);

// The dialog controller function
DialogController.$inject = ['$scope', '$mdDialog', 'dialogService'];
function DialogController($scope, $mdDialog, dialogService) {

    // Add body
    $scope.dialogService = dialogService;

    // Hide the dialog
    $scope.hide = function() {
        $mdDialog.hide();
    };

    // Cancel the dialog
    $scope.cancel = function() {
        $mdDialog.cancel();
    };

    // Pass the answer and hide the dialog
    $scope.answer = function(answer) {
        $mdDialog.hide(answer);
    };

    // Update graph when data changes
    $scope.$watch('dialogService.graphLabels', function() { updateGraphLabels() }, true);
    $scope.$watch('dialogService.graphResultParking', function() { updateGraphDataDrukte() }, true);
    $scope.$watch('dialogService.graphResultTemp', function() { updateGraphDataTemp() }, true);
    $scope.$watch('dialogService.graphResultTempOnly', function() { updateGraphDataTempOnly() }, true);


    // Empty labels and data
    $scope.labels = [];
    $scope.data = [];
    $scope.series = ['Parkeerdrukte', 'Temperatuur'];

    // Update the labels beneath the graph
    function updateGraphLabels() {
        var res = [];
        for(var i = 0; i < $scope.dialogService.graphLabels.length; i++) {
            res[i] = $scope.dialogService.graphLabels[i] + ":00";
        }
        $scope.labels = res;
    }


    // Add the density data to the graph
    function updateGraphDataDrukte() {
        var res = [];
        for(var i = 0; i < $scope.dialogService.graphResultParking.length; i++) {
            res[i] = $scope.dialogService.graphResultParking[i];
        }
        $scope.data = [ res, $scope.data[1] ];
    }

    // Add the temperature data to the graph
    function updateGraphDataTemp() {
        var res = [];
        for(var i = 0; i < $scope.dialogService.graphResultTemp.length; i++) {
            res[i] = $scope.dialogService.graphResultTemp[i];
        }
        $scope.data = [ $scope.data[0], res ];
    }

    // Add the temperature only to the graph
    function updateGraphDataTempOnly() {
        var res = [];
        for(var i = 0; i < $scope.dialogService.graphResultTempOnly.length; i++) {
            res[i] = $scope.dialogService.graphResultTempOnly[i];
        }
        $scope.data = [ res ];
    }
}
