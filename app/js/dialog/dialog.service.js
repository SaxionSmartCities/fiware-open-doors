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
    var resultTemp = [];

    service.getTemperatureData = function() {
        // Clear all arrays
        labels = [];
        resultParking = [];
        resultTemp = [];
        // Start 24 calls for parking data
        // Setup start time
        //Calculate the timezone to use in calculations
        var timezone = moment().format('Z').substring(0, 3) * -1;
        var startTime = moment().minute(30).subtract(25 + timezone, 'hours').unix();
        var hour = 60 * 60;


        for (var i = 0; i < 24; i++) {
            var j = i;

            labels[i] = moment().minute(30).subtract((25 - j) + timezone, 'hours').hour();
            var query = C.QUERY.TEMPERATURE;

            // Replace the start time
            query = query.replace("{st}", startTime * 1000);

            // Replace the end time
            startTime += hour;
            query = query.replace("{et}", startTime * 1000);

            // Make a HTTP call
            makeCallTempOnly(query, i);
        }
    };

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
        var hour = 60 * 60;


        for (var i = 0; i < 24; i++) {
            var j = i;

            labels[i] = moment().minute(30).subtract((25 - j) + timezone, 'hours').hour();
            var query = C.QUERY.GARAGE;

            // Replace the garagename
            query = query.replace("{n}", garagename);
            // Replace the start time
            query = query.replace("{st}", startTime * 1000);

            // Replace the end time
            startTime += hour;
            query = query.replace("{et}", startTime * 1000);

            // Make a HTTP call
            makeCallParking(query, i);
        }

        // Start 24 calls for temperature data
        // Setup start time
        var startTime = moment().minute(30).subtract(25 + timezone, 'hours').unix();
        var hour = 60 * 60;

        for (var i = 0; i < 24; i++) {
            var query = C.QUERY.TEMPERATURE;

            // Replace the start time
            query = query.replace("{st}", startTime * 1000);

            // Replace the end time
            startTime += hour;
            query = query.replace("{et}", startTime * 1000);

            // Make a HTTP call
            makeCallTemp(query, i);
        }
    };

    /*
     * Make a HTTP call to get the average free spots between 2 timestamps
     */
    function makeCallParking(query, index) {
        $http.get(C.URL.CKAN_QUERY + query)
            .then(function (response) {
                var data = response.data;
                resultParking[index] = data.result.records[0].round;

                if(data.result.records[0].round === null)
                    resultParking[index] = 0;

                // Check if array is filled
                isArrayFilled();
            }, function error(response) {
                console.log("Error retrieving garage data from CKAN");
            });
    }

    /*
     Make a HTTP call to get the average free spots between 2 timestamps
     */
    function makeCallTemp(query, index) {
        $http.get(C.URL.CKAN_QUERY + query)
            .then(function (response) {
                var data = response.data;
                resultTemp[index] = data.result.records[0].round;

                if(data.result.records[0].round === null)
                    resultTemp[index] = 0;

                // Check if array is filled
                isArrayFilled();
            }, function error(response) {
                console.log("Error retrieving garage data from CKAN");
            });
    }

    /*
     Make a HTTP call to get the average free spots between 2 timestamps
     */
    function makeCallTempOnly(query, index) {
        $http.get(C.URL.CKAN_QUERY + query)
            .then(function (response) {
                var data = response.data;
                resultTemp[index] = data.result.records[0].round;

                if(data.result.records[0].round === null)
                    resultTemp[index] = 0;

                // Check if array is filled
                isTempOnlyArrayFilled();
            }, function error(response) {
                console.log("Error retrieving garage data from CKAN");
            });
    }

    /*
    Check if array is filled
    if filled update the graph
     */
    function isArrayFilled() {
        for(var i = 0; i < 24; i++) {
            if(resultTemp[i] === undefined) return false;
        }

        for (var i = 0; i < 24; i++) {
            if (resultParking[i] === undefined) return false;
        }
        service.graphResultParking = resultParking;
        service.graphLabels = labels;
        service.graphResultTemp = resultTemp;
    }

    /*
     Check if temp only array is filled
     if filled update the graph
     */
    function isTempOnlyArrayFilled() {
        for(var i = 0; i < 24; i++) {
            if(resultTemp[i] === undefined) return false;
        }
        service.graphLabels = labels;
        service.graphResultTempOnly = resultTemp;
    }

    return service;
}
