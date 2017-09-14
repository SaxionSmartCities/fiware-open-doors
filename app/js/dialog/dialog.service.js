/**
 * Created by Ruben on 18-6-2015.
 */
angular.module('org.open-doors')
    .factory('dialogService', dialogService);

// The body service
dialogService.$inject = ['C', '$http'];
function dialogService(C, $http) {
    var service = {};
    var labels = [];
    var resultParking = [];

    service.getParkingData = function(garagename) {
        // Clear all arrays
        labels = [];
        resultParking = [];
        resultTemp = [];
        parking = true;
        // Start 24 calls for parking data
        // Setup start time
        //Calculate the timezone to use in calculations
        var timezone = moment().format('Z').substring(0, 3) * -1;
        var startTime = moment().minute(30).subtract(25 + timezone, 'hours').unix();
        var query = C.QUERY.GARAGE;
        var resourceId  = C.parkingService.resources[garagename];
        if (resourceId) {
            // Replace the garagename
            query = query.replace("{resourceId}", resourceId);
            // Replace the start time
            query = query.replace("{oldestTimestamp}", startTime);
            // Make a HTTP call
            makeCallParking(query, startTime);
        }
    };

    /*
     * Make a HTTP call to get the average free spots between 2 timestamps
     */
    function makeCallParking(query, startTimeSecs) {
        $http.get(query)
            .then(function (response) {
                var data = response.data;
                var records = data.result.records;
                var availableSpots = [];
                var totalSpots = [];
                for (var i = 0; i < records.length; i++) {
                    if (records[i].attrName === 'availableSpotNumber') {
                        availableSpots.push({ x: records[i].recvTimeTs * 1000, y: Number(records[i].attrValue) });
                    } else if (records[i].attrName === 'totalSpotNumber') {
                        totalSpots.push({ x: records[i].recvTimeTs * 1000, y: Number(records[i].attrValue) });
                    }
                }
                service.parkingTotalSpots = totalSpots;
                service.parkingAvailableSpots = availableSpots;
            }, function error(response) {
                console.log("Error retrieving garage data from CKAN");
            });
    }

    return service;
}
