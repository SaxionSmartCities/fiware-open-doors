/**
 * Created by yourilefers on 26-05-15.
 */
(function () {
    'use strict';

    angular.module('org.open-doors')
    .factory('homeService', homeService);

    // The body service
    homeService.$inject = ['C', '$http', '$interval'];
    function homeService(C, $http, $interval) {

        // Parkeerplaatsen interval var
        var groundwaterTimer = null;
        var parkeerplaatsenTimer = null;
        var temperatureDataTimer = null;
        var drukteTimer = null;

        // The service
        var service = {};


        // The list of markers (also cache)
        service.markers = {};

        service.layers = {};
        service.temperature = undefined;

        /**
         * Retrieve temperature.
         *
         */
        service.getTemperature = function() {
            getTemperatureData();
        };

        /**
         * Retrieve markers list.
         *
         * @param type The type (system name) of
         * @param status
         */
        service.getMarkers = function(type, status) {
            switch(type) {
                case 'grondwaterstanden':
                    if(status) {
                        getGroundwaterData();
                    }
                    break;
                case 'toiletten':
                    if(status) {
                        getWCMarkers();
                    }
                    break;
                case 'musea':
                    if(status) {
                        getMuseaMarkers();
                    }
                    break;
                case 'monumenten':
                    if(status) {
                        getMonumentMarkers();
                    }
                    break;
                case 'parkeerplaatsen':
                    if(parkeerplaatsenTimer !== null) {
                        $interval.cancel(parkeerplaatsenTimer);
                    }
                    if(status) {
                        getParkeerplaatsData();
                    }
                    break;
                case 'winkels':
                    if(status) {
                        getWinkelMarkers();
                    }
                    break;
                case 'boederijen':
                case 'begraafplaatsen':
                case 'industrieen':
                case 'kloosters':
                case 'grensafbakeningen':
                case 'sport':
                case 'kerken':
                case 'woonhuizen':
                case 'synagoges':
                case 'overige':
                    if(status) {
                        getMonumentMarkers();
                    }
                    break;
                case 'verkeersdrukte':
                    if(drukteTimer !== null) {
                        $interval.cancel(drukteTimer);
                    }
                    if(status) {
                        getDrukteData();
                    }
                default:
                    break;
            }
        };

        function getWCMarkers() {
            $http.get(C.URL.WC).
                then(function success(response) {
                    var data = response.data;
                    for (var i = 0; i < data.length; i++) {
                        //add title to popup
                        data[i].message = "<h4>" + data[i].title + "</h4>";
                        //add price to popup
                        data[i].message += "Prijs: " + ((data[i].price <= 0) ? "Gratis" : "&euro;" + data[i].price.toFixed(2));
                        //Add accessibility to popup
                        if (data[i].accessible) {
                            data[i].message += "<br> Toegankelijk voor gehandicapten";
                        }
                        data[i].icon = C.MARKERS.TOILET;
                    }
                    service.markers.toiletten = data;
                }, function error(response) {
                    console.error("Error retrieving data (wc's)");
                });


        }

        /**
         * Fuction to retrieve all information of musea from a JSON file
         * located at museaURL
         */
        function getMuseaMarkers() {
            $http.get(C.URL.MUSEA).
                then(function success(response) {
                var data = response.data;
                for (var i = 0; i < data.length; i++) {
                        //add a title to the popup
                        data[i].message = "<h4>" + data[i].title + " </h4>";
                        data[i].message += "Prijs: " + ((data[i].price <= 0) ?  "Gratis" : "&euro;" + data[i].price.toFixed(2));

                        var open = false;
                        for(var j = 0; j < data[i].timesopen.length; j++) {
                            // TODO Commentaar int engels!
                            //kijken of museum op deze dag geopend is
                            if(moment().format("ddd").toLowerCase() == data[i].timesopen[j].day.toLowerCase()) {
                                open = true;
                                var time = moment().get('hour') + ":" + moment().get('minute');

                                // TODO Commentaar int engels!
                                //Kijken wanneer het museum open is
                                if(time > data[i].timesopen[j].open && time < data[i].timesopen[j].close) {
                                    data[i].message += "<br>Open tot " +  data[i].timesopen[j].close;
                                } else if(time < data[i].timesopen[j].open) {
                                    data[i].message += "<br>Vandaag open van " + data[i].timesopen[j].open + " tot " + data[i].timesopen[j].close;
                                } else {
                                    data[i].message += "<br>Gesloten";
                                }

                            }
                        }

                        // TODO Commentaar int engels!
                        //speciale cases, geen openingstijden bekend en vandaag niet open
                        if(data[i].timesopen.length <= 0) {
                            data[i].message += "<br>Openingstijden onbekend";
                        } else if(!open) {
                            data[i].message += "<br>Gesloten";
                        }

                        data[i].message += "<br><br><a href='" + data[i].url + "' target='_blank'>Klik hier voor meer informatie</a>";

                        data[i].icon = C.MARKERS.MUSEUM;
                    }
                    service.markers.musea = data;

            }, function error(response) {
                    console.log("Error while retrieving museums.");
            });
        }

        // TODO Commentaar int engels!
        /**
         * Haal de monumenten op van C.URL.MOMUNEMT_DATA
         * en plaats deze op de kaart
         * ook zit er een switch voor categorieen.
         */
        function getMonumentMarkers() {
            $http.get(C.URL.MOMUNEMT).
                then(function success(response) {
                    var data = response.data;

                    //The categories of monuments
                    var boerderijen = [];
                    var begraafplaatsen = [];
                    var industrieen = [];
                    var kloosters = [];
                    var grensafbakeningen = [];
                    var sport = [];
                    var kerken = [];
                    var woonhuizen = [];
                    var synagoges = [];
                    var overige = [];

                    for (var i = 0; i < data.length; i++) {
                        //add title to popup
                        data[i].message = "<h4>" + data[i].name + "</h4>";
                        //add type of monument
                        data[i].message += 'Soort gebouw: '+ data[i].use + "<br>";
                        //add age
                        var msg = data[i].bouwjaar;
                        if(msg !== "onbekend") {
                            data[i].message += 'Gebouwd in: ' + data[i].bouwjaar + "<br>";
                        }
                        //add architect
                        msg = data[i].architect;
                        if(msg !== "onbekend") {
                            data[i].message +='Ontworpen door: '+ data[i].architect;
                        }


                        // TODO Commentaar int engels!
                        /**
                         * Pak de goede icon voor het type monument
                         */
                        switch (data[i].use) {
                            case 'Boerderij':
                                data[i].icon = C.MARKERS.FARM;
                                boerderijen.push(data[i]);
                                break;
                            case 'Begraafplaats en -onderdl':
                                data[i].icon = C.MARKERS.GRAVE;
                                begraafplaatsen.push(data[i]);
                                break;
                            case 'Industrie':
                                data[i].icon = C.MARKERS.INDUSTRY;
                                industrieen.push(data[i]);
                                break;
                            case 'Klooster, kloosteronderdl':
                                data[i].icon = C.MARKERS.CHURCH;
                                kloosters.push(data[i]);
                                break;
                            case 'Grensafbakening':
                            case 'Erfscheiding':
                                data[i].icon = C.MARKERS.BORDER;
                                grensafbakeningen.push(data[i]);
                                break;
                            case 'Sport en recreatie':
                                data[i].icon = C.MARKERS.SPORT;
                                sport.push(data[i]);
                                break;
                            case 'Gedenkteken':
                            case 'Kerk en kerkonderdeel':
                                data[i].icon = C.MARKERS.CROSS;
                                kerken.push(data[i]);
                                break;
                            case 'Woonhuis':
                                data[i].icon = C.MARKERS.VILLA;
                                woonhuizen.push(data[i]);
                                break;
                            case 'Synagoge':
                                data[i].icon = C.MARKERS.SYNAGOGUE;
                                synagoges.push(data[i]);
                                break;
                            default :
                                data[i].icon = C.MARKERS.MONUMENT;
                                overige.push(data[i]);
                                break;
                        }

                    }

                    //set the lists
                    service.markers.boerderijen = boerderijen;
                    service.markers.begraafplaatsen = begraafplaatsen;
                    service.markers.industrieen = industrieen;
                    service.markers.kloosters = kloosters;
                    service.markers.grensafbakeningen = grensafbakeningen;
                    service.markers.sport = sport;
                    service.markers.kerken = kerken;
                    service.markers.woonhuizen = woonhuizen;
                    service.markers.synagoges = synagoges;
                    service.markers.overige = overige;


                }, function error(response) {
                    console.error("Error retrieving data (monumenten)");
                });

        }

        /**
         * Retrieve temperature data.
         * The function will execute every X seconds.
         */
        function getTemperatureData() {
            retrieveTemperatureDataV2();
            temperatureDataTimer = $interval(retrieveTemperatureDataV2, C.INTERVAL.TEMPERATURE_DATA * 1000);
        }
        function retrieveTemperatureData() {
            // Refetch
            $http.get(C.URL.TEMPERATUUR, {headers: {Accept: 'application/json'}})
                .then(function success(response) {
                    var data = response.data;
                    if (data.errorCode) {
                        console.log(C.URL.TEMPERATUUR + ' returns ' + data.errorCode.code + ' ' + data.errorCode.reasonPhrase + ' - ' + data.errorCode.details);
                    } else {
                        var temperature = data.contextResponses[0].contextElement.attributes[3].value;
                        angular.element(document.querySelector('#temperature')).html(temperature + '&deg');
                    }
                }, function error(response) {
                    console.log("Error retrieving Temperature");
                });
        }

        /**
         * Retrieve parkeerplaats data.
         * The function will execute every X seconds.
         */
        function getParkeerplaatsData() {
            retrieveParkeerplaatsDataV2();
            parkeerplaatsenTimer = $interval(retrieveParkeerplaatsDataV2, C.INTERVAL.PARKEER_DATA * 1000);
        }
        function retrieveParkeerplaatsData() {

            // Refetch
            $http.get(C.URL.PARKEREN, {headers: {Accept: 'application/json'}})
                .then (function success(response) {
                    var data = response.data;
                    if (data.errorCode) {
                        console.log(C.URL.PARKEREN + ' returns ' + data.errorCode.code + ' ' + data.errorCode.reasonPhrase + ' - ' + data.errorCode.details);
                    } else {
                        // The list to use
                        var list = [];

                        // Parse the data
                        for (var i = 0; i < data.contextResponses.length; i++) {

                            // Get the item
                            var item = data.contextResponses[i].contextElement;

                            // Valid?
                            if (!findAttribute('max_spots', item.attributes)) {
                                continue;
                            }

                            // Setup
                            var toAdd = {
                                id: item.id,
                                title: findAttribute('original_name', item.attributes).value,
                                max: parseInt(findAttribute('max_spots', item.attributes).value),
                                free: parseInt(findAttribute('free_spots', item.attributes).value),
                                lastUpdate: findAttribute('last_update', item.attributes).value,
                                lat: parseFloat(findAttribute('position', item.attributes).value.split(',')[0]),
                                lng: parseFloat(findAttribute('position', item.attributes).value.split(',')[1]),
                                icon: C.MARKERS.PARKING
                            };
                            var temp = "<h4>" + toAdd.title + "</h4>Aantal vrij: " + toAdd.free + "<br>Totaal: " + toAdd.max + "<div ng-controller='OpenDialogController'><br><br><b>Bekijk grafiek</b><br><a ng-click=\"showGraph('" + item.id + "')\">Klik hier</a></div>";
                            toAdd.message = temp;

                            // Add to the list
                            list.push(toAdd);

                        }

                        // Set the list
                        service.markers.parkeerplaatsen = list;
                    }
                }, function error(response) {
                    console.log("Error retrieving Parkeerplaatsen");
                });
        }

        function retrieveParkeerplaatsDataV2() {
            var desc = C.parkingService;
            var headers = {
                'Accept'            : 'application/json',
                 'Fiware-Service'    : desc.fiwareService,
                 'Fiware-ServicePath': desc.fiwareServicePath
            };
            // Refetch
            $http.get(desc.url, { headers: headers })
                .then (function success(response) {
                    var data = response.data;
                    if (data.errorCode) {
                        console.log(desc.url + ' returns ' + data.errorCode.code + ' ' + data.errorCode.reasonPhrase + ' - ' + data.errorCode.details);
                    } else {
                        // The list to use
                        var list = [];

                        // Parse the data
                        for (var i = 0; i < data.length; i++) {

                            // Get the item
                            var item = data[i];

                            // Setup
                            var toAdd = {
                                id: item.id,
                                title: item.name.value.value,
                                max: parseInt(item.totalSpotNumber.value),
                                free: parseInt(item.availableSpotNumber.value),
                                lastUpdate: item.dateModified.value,
                                lat: parseFloat(item.location.value.coordinates[0]),
                                lng: parseFloat(item.location.value.coordinates[1]),
                                icon: C.MARKERS.PARKING
                            };
                            var temp = "<h4>" + toAdd.title + "</h4>Aantal vrij: " + toAdd.free + "<br>Totaal: " + toAdd.max + "<div ng-controller='OpenDialogController'><br><br><b>Bekijk grafiek</b><br><a ng-click=\"showGraph('" + item.id + "')\">Klik hier</a></div>";
                            toAdd.message = temp;

                            // Add to the list
                            list.push(toAdd);

                        }

                        // Set the list
                        service.markers.parkeerplaatsen = list;
                    }
                }, function error(response) {
                    console.log("Error retrieving Parkeerplaatsen");
                });
        }
        /**
         * Function that retrieves Winkel information from
         * C.URL.WINKELS, and places the markers in the corosponding markers array
         */
        function getWinkelMarkers() {
            $http.get(C.URL.WINKELS, {headers: {Accept: 'application/json'}})
                .then(function success(response) {
                    var data = response.data;
                    //The categories of shops
                    var schoenen = [];
                    var kleding = [];
                    var electronica = [];
                    var supermarkt = [];
                    var overig = [];
                    var meubel = [];
                    var bouwmarkt = [];

                    for(var i = 0; i < data.length; i++) {
                        var item = data[i];
                        var categorie = item.categorie;
                        //create the popup
                        item.message = "<h4>" + item.title + "</h4>";

                        //determine witch category this shop belongs in
                        //and set the right icon
                        switch (categorie) {
                            case 'Schoenen':
                                data[i].icon = C.MARKERS.SHOES;
                                schoenen.push(data[i]);
                                break;
                            case 'Electronica':
                                data[i].icon = C.MARKERS.ELECTRONIC;
                                electronica.push(data[i]);
                                break;
                            case 'Supermarkt':
                                data[i].icon = C.MARKERS.SUPERMARKET;
                                supermarkt.push(data[i]);
                                break;
                            case 'Kleding':
                                data[i].icon = C.MARKERS.CLOTHES;
                                kleding.push(data[i]);
                                break;
                            case 'Meubelen':
                                data[i].icon = C.MARKERS.HOME;
                                meubel.push(data[i]);
                                break;
                            case 'Bouwmarkt':
                                data[i].icon = C.MARKERS.HARDWARE;
                                bouwmarkt.push(data[i]);
                                break;
                            default:
                                data[i].icon = C.MARKERS.MARKET;
                                overig.push(data[i]);
                                break;
                        }
                    }
                    service.markers.schoenen = schoenen;
                    service.markers.electronica = electronica;
                    service.markers.supermarkt = supermarkt;
                    service.markers.kleding = kleding;
                    service.markers.overig = overig;
                    service.markers.meubel = meubel;
                    service.markers.bouwmarkt = bouwmarkt;
            }, function error(response) {
                    console.log("Error retrieving winkels");
                });
        }


        /*
         * GetDrukte
         */
        function getDrukteData() {
            retrieveDrukteData();
            drukteTimer = $interval(retrieveDrukteData, C.INTERVAL.DRUKTE_DATA * 1000);
        }

        /**
         * Method that retrieves data from C.URL.DRUKTE
         * and adds it to service.layers.verkeersdrukte
         */
        function retrieveDrukteData() {
            $http.get(C.URL.DRUKTE, {headers: {Accept: 'application/json'}})
                .then(function success(response){
                    var data = response.data;
                    if (data.errorCode) {
                        console.log(C.URL.DRUKTE + ' returns ' + data.errorCode.code + ' ' + data.errorCode.reasonPhrase + ' - ' + data.errorCode.details);
                    } else {
                        var layers = [];

                        // for all roads
                        for (var i = 0; i < data.contextResponses.length; i++) {

                            // Get the item
                            var item = data.contextResponses[i].contextElement;
                            //get the items name
                            var name = findAttribute('original_name', item.attributes).value;

                            var locations = findAttribute('locations', item.attributes).value;

                            //determine points of this roads
                            var points = [];
                            for (var j = 0; j < locations.length; j++) {
                                var location = locations[j];
                                if (location !== undefined) {
                                    //create a new point for the line
                                    var point = new L.LatLng(location[0].value, location[1].value);
                                    points.push(point);
                                }
                            }

                            //parse speed data
                            var speed = findAttribute('max_speed', item.attributes).value;
                            var actual = findAttribute('current_speed', item.attributes).value;
                            var percentage = actual / speed * 100;

                            //Color the road the right color
                            var color = '#F00';
                            if (percentage > 75) {
                                color = '#0F0';
                            } else if (percentage > 50) {
                                color = '#F90'
                            }

                            //create the line and add all attributes
                            var line = new L.Polyline(points, {color: color, weight: 6, opacity: 0.7});

                            line.bindPopup("<h4>" + name + "</h4><b>Maximale snelheid: </b>" + speed + "KM/h<br><b>Huidige snelheid: </b>" + actual + "KM/h");

                            //add the created line too the layers
                            layers.push(line);
                        }

                        //update all layers
                        service.layers.verkeersdrukte = layers;
                    }
                }, function error(response){
                console.log("Error retrieving traffic data");
            });

        }

        /**
         * Find an attribute
         * @param name
         * @param attributes
         * @returns {*}
         */
        function findAttribute(name, attributes) {
            for (var i = 0; i < attributes.length; i++) {
                if(attributes[i].name === name) {
                    return attributes[i];
                }
            }
            return {value: ''};
        }

        function getGroundwaterData() {
            retrieveGroundwaterData();
            if (groundwaterTimer) {
                $interval.cancel(groundwaterTimer);
                groundwaterTimer = null;
            }
            groundwaterTimer = $interval(getGroundwaterData, C.INTERVAL.GROUNDWATER * 1000);
        }

        function retrieveGroundwaterData() {
            var desc = C.groundwaterService;
            var headers = {
                'Accept'            : 'application/json',
                'Fiware-Service'    : desc.fiwareService,
                'Fiware-ServicePath': desc.fiwareServicePath
            };
            $http.get(desc.url, { headers: headers })
                .then (function success(response) {
                    var data = response.data;
                    if (data.errorCode) {
                        console.log(desc.url + ' returns ' + data.errorCode.code + ' ' + data.errorCode.reasonPhrase + ' - ' + data.errorCode.details);
                    } else {
                        var list = [];
                        for (var i = 0; i < data.length; i++) {
                            var item = data[i];
                            // var location = findAttribute(device.staticAttributes, 'location');
                            // location.value.coordinates[0] = meetlijn.latitude;
                            // location.value.coordinates[1] = meetlijn.longitude;
                            // findAttribute(device.staticAttributes, 'name').value = meetlijn.name;
                            // findAttribute(device.staticAttributes, 'groundSurface').value = meetlijn.groundSurface;
                            // findAttribute(device.staticAttributes, 'topMonitoringWell').value = meetlijn.topMonitoringWell;
                            // findAttribute(device.staticAttributes, 'topFilter').value = meetlijn.topFilter;
                            // findAttribute(device.staticAttributes, 'bottomFilter').value = meetlijn.bottomFilter;
                            // attribs.push(createAttribute('dateObserved', (new Date(measurement[0])).toISOString()));
                            // attribs.push(createAttribute('waterLevel', measurement[1]));
                            // attribs.push(createAttribute('lastUpdate', (new Date()).toISOString()));

                            var toAdd = {
                                id: item.id,
                                title: item.name.value,
                                waterLevel: parseFloat(item.waterLevel.value),
                                groundSurface: parseFloat(item.groundSurface.value),
                                dateObserved: new Date(item.dateObserved.value),
                                lastUpdate: new Date(item.lastUpdate.value),
                                lat: parseFloat(item.location.value.coordinates[0]),
                                lng: parseFloat(item.location.value.coordinates[1]),
                                icon: C.MARKERS.GROUNDWATER
                            };
                            var level = (toAdd.waterLevel - toAdd.groundSurface).toFixed(3);
                            var observedDateReleative = moment(toAdd.dateObserved).fromNow();
                            var observedDate = moment(toAdd.dateObserved).format('LLL');
                            toAdd.message = "<h4>" + toAdd.title + "</h4><p>Niveau t.o.v. maaiveld: " + level + "</p>" +
                                            "<p>Meettijd: " + observedDate + " (" + observedDateReleative + ")</p>";

                            toAdd.label = {
                                message: String(level),
                                    options: {
                                    noHide: true
                                }
                            }
                            list.push(toAdd);
                        }
                        service.markers.grondwaterstanden = list;
                    }
                }, function error(response) {
                    console.log("Error retrieving Groundwater levels");
                });
        }

        function retrieveTemperatureDataV2() {
            var desc = C.weatherService;
            var headers = {
                'Accept'            : 'application/json',
                'Fiware-Service'    : desc.fiwareService,
                'Fiware-ServicePath': desc.fiwareServicePath
            };

            $http.get(desc.url, { headers: headers })
                .then(function success(response) {
                    var data = response.data;
                    if (data.errorCode) {
                        console.log(desc.url + ' returns ' + data.errorCode.code + ' ' + data.errorCode.reasonPhrase + ' - ' + data.errorCode.details);
                    } else {
                        service.temperature = data[0].temperature.value;
                        // angular.element(document.querySelector('#temperature')).html(temperature + '&deg');
                    }
                }, function error(response) {
                    console.log("Error retrieving Temperature");
                });
        }
        return service;
    }
}());