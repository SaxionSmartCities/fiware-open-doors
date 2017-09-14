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



    // Empty labels and data
    $scope.labels = [];
    $scope.data = [];
    $scope.datasetOverride = [{
        label: 'Beschikbare plaatsen',
        data: [],
        pointRadius: 0
    }, {
        label: 'Totaal aantal plaatsen',
        data: [],
        pointRadius: 0
    }];
    $scope.series = ['Parkeerdrukte', 'Beschikbaar'];
    $scope.options = {
        scales: {
            xAxes: [{
                display: true,
                type: 'time',
                // offset: true,
                position: 'bottom',
                time: {
                    unit: 'hour',
                    stepSize: 1 / 12,
                    distribution: 'linear',
                    bounds: 'data',
                    displayFormats: {
                        hour: 'HH:mm'
                    },
                    tooltipFormat: 'D MMM HH:mm'
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Tijdstip'
                },
                ticks: {
                    // stepSize: 1
                }
            }],
            yAxes: [{
                display: true,
                type: 'linear',
                position: 'left',
                scaleLabel: {
                    display: true,
                    labelString: 'Beschikbare plaatsen'
                }
            }]
        }
    };
    // Update graph when data changes
    $scope.$watch('dialogService.parkingAvailableSpots', function() { updateGraphDataParking() });

    // Update the labels beneath the graph
    function updateGraphLabels() {
        var res = [];
        for (var i = 0; i < dialogService.graphLabels.length; i++) {
            res[i] = dialogService.graphLabels[i] + ":00";
        }
        $scope.labels = res;
    }


    // Add the density data to the graph
    function updateGraphDataParking() {
        if (dialogService.parkingAvailableSpots && dialogService.parkingTotalSpots) {
            $scope.data = [ dialogService.parkingAvailableSpots, dialogService.parkingTotalSpots ];
        }
    }

}
