/**
 * Created by yourilefers on 26-05-15.
 */
'use strict';
angular.module('org.open-doors')
    .controller('HomeController', HomeController)
    .config(HomeControllerConfig);

// The home controller config
HomeControllerConfig.$inject = ['$routeProvider', '$mdThemingProvider'];
function HomeControllerConfig($routeProvider, $mdThemingProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'js/home/home.tpl.html',
            controller: 'HomeController'
        })
        .otherwise({
            redirectTo: '/home'
        });
    $mdThemingProvider.theme('default').primaryPalette('red').accentPalette('red');
}

// The home controller function
HomeController.$inject = ['C', '$scope', 'bodyService', 'homeService', 'leafletData', '$mdDialog', 'dialogService', '$routeParams'];
function HomeController(C, $scope, bodyService, homeService, leafletData, $mdDialog, dialogService, $routeParams) {

    //For tracking location
    var lastLocation;
    var locMarker;
    var locCircle;

    //For layers
    var layers = [];

    // Add body
    $scope.bodyService = bodyService;
    $scope.homeService = homeService;
    $scope.dialogService = dialogService;

    if ($routeParams && Object.keys($routeParams).length > 0) {
        bodyService.listItems.forEach(function(item) {
            var paramValue = $routeParams[item.system];
            item.active = !!paramValue;
        });
        bodyService.allShopsActive = !!$routeParams['winkels'];
        bodyService.allMonumentsActive = !!$routeParams['monumenten'];
    }
    // Setup map
    $scope.map = {

        // Centrum van Enschede
        enschede: {
            lat: 52.216667,
            lng: 6.883333,
            zoom: 14
        },

        // List of markers
        markers: {},

        // Default settings
        defaults: {
            scrollWheelZoom: true,
	        tileLayer: 'http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png',
	        tileLayerOptions: {
		        detectRetina: true,
		        reuseTiles: true
	        }
        }
    };



	// Update markers als het menu wordt veranderd
	// 'homeService.markers'
	$scope.$watch('bodyService.listItems', function() { updateMarkers(true) }, true);
	$scope.$watch('homeService.markers', function() { updateMarkers(false) }, true);
	$scope.$watch('bodyService.shopItems', function() { updateMarkers(true) }, true);
    $scope.$watch('bodyService.monumentItems', function() { updateMarkers(true) }, true);
    // $scope.$watch('homeService.layers.verkeersdrukte', function () {updateMarkers(false)}, false);
    $scope.$watch('homeService.temperature', function() {updateTemperature(true)}, true);

    //Update the markers if there are new markers available or markers are getting toggled.
    function updateMarkers(reload) {

        //delete all old markers
        $scope.map.markers = {};

        //delete old layers
        //Get map object
        leafletData.getMap().then(function (map) {
            for (var i = 0; i < layers.length; i++) {
                //delete layers form map
                map.removeLayer(layers[i]);
            }
            //update map
            layers = [];
        });

        // Go through each section
        for (var i = 0; i < $scope.bodyService.listItems.length; i++) {

            // Add markers for the session of active
            if (reload) {
                $scope.homeService.getMarkers($scope.bodyService.listItems[i].system, $scope.bodyService.listItems[i].active);
            }

            // Markers
            var items = $scope.homeService.markers[$scope.bodyService.listItems[i].system];
            if (items !== undefined && $scope.bodyService.listItems[i].active) {
                for (var j = 0; j < items.length; j++) {
                    $scope.map.markers[$scope.bodyService.listItems[i].system + j] = items[j];
                }
            }

            //add new layers
            if ($scope.homeService.layers.verkeersdrukte !== undefined
                && $scope.bodyService.listItems[i].system === 'verkeersdrukte'
                && $scope.bodyService.listItems[i].active) {
                //get map opbject
                leafletData.getMap().then(function (map) {
                    for (var i = 0; i < $scope.homeService.layers.verkeersdrukte.length; i++) {
                        //add the layers to the layers var
                        layers[i] = $scope.homeService.layers.verkeersdrukte[i];
                        //add layers to the actual map
                        map.addLayer($scope.homeService.layers.verkeersdrukte[i]);
                    }
                });
            }
        }

        //just load shops once
        if (reload) {
            $scope.homeService.getMarkers('winkels', true);
        }

        //loop through all shop categories
        for (var i = 0; i < $scope.bodyService.shopItems.length; i++) {
            //load all shops that are selected onto the map
            var items = $scope.homeService.markers[$scope.bodyService.shopItems[i].system];
            if (items !== undefined && $scope.bodyService.shopItems[i].active) {
                for (var j = 0; j < items.length; j++) {
                    $scope.map.markers[$scope.bodyService.shopItems[i].system + j] = items[j];
                }
            }
        }

        //loop through all monument categories
        for (var i = 0; i < $scope.bodyService.monumentItems.length; i++) {
            if (reload) {
                $scope.homeService.getMarkers($scope.bodyService.monumentItems[i].system, $scope.bodyService.monumentItems[i].active);
            }

            var items = $scope.homeService.markers[$scope.bodyService.monumentItems[i].system];
            if (items !== undefined && $scope.bodyService.monumentItems[i].active) {
                for (var j = 0; j < items.length; j++) {
                    $scope.map.markers[$scope.bodyService.monumentItems[i].system + j] = items[j];
                }
            }
        }


    }

    function updateTemperature(reload) {
        //update temperature
        if(reload) {
            $scope.homeService.getTemperature();
        }
    }

    //Code for Geolocation and related parts

    //Get the map object for locations
    leafletData.getMap().then(function (map) {
        //Set view to current location
        map.locate({watch: true, setView: false, maxZoom: 14});


        //set onlocation found and error methods
        map.on('locationfound', onLocationFound);
        map.on('locationerror', onLocationError);

        //create a custom button
        var centerLocationButtonOptions = {
            'text': '',
            'iconUrl': 'images/icons/locate.png',  // string
            'onClick': centerOnLocation,  // callback function
            'hideText': true,  // bool
            'maxWidth': 30,  // number
            'doToggle': false,  // bool
            'toggleStatus': false  // bool
        };

        /**
         * Fucntion that pans the map to lastLocation if known
         */
        function centerOnLocation() {
            if (lastLocation !== undefined) {
                map.panTo(lastLocation.latlng);
            }
        }

        //add the button to the map
        var centerLocationButton = new L.Control.Button(centerLocationButtonOptions).addTo(map);

        /**
         * Fucntion that handles onLocationFound events
         * places a marker on the map
         * @param location the location given by the event
         */
        function onLocationFound(location) {
            //determine radius
            var radius = location.accuracy / 2;
            lastLocation = location;

            //Set the marker, icon and the popup
            var marker = L.marker(location.latlng, {icon: new L.icon(C.MARKERS.PERSON)})
                .bindPopup("U bevind zich in een straal van " + radius + " meter van dit punt.");

            //remove old location marker and circle
            if (locMarker !== undefined) {
                map.removeLayer(locMarker);
                map.removeLayer(locCircle);
            }

            // Add new marker and circle
            map.addLayer(marker);
            locMarker = marker;

            //draw a circle around your location to visualise the precision of the locations
            locCircle = L.circle(location.latlng, radius);
            map.addLayer(locCircle);


        }

        //If location is not found, show an error
        function onLocationError(e) {
            $scope.locationError();
        }
    });


    //Allert for unaviable location
    $scope.alert = '';
    $scope.locationError = function () {
        // create a dialog that shows that location is not available.
        $mdDialog.show(
            $mdDialog.alert()
                //Create the message
                .parent(angular.element(document.body))
                .title('Geen locatie beschikbaar')
                .content('Uw locatie was niet beschikbaar. Als u uw eigen locatie wil zien geef hier dan toestemming voor.')
                .ariaLabel('Locatie error')
                .ok('Ok')
                .targetEvent()
        );
    };


    /**
     * Custom map controlls for Leaflet
     * By Ejh at Github
     * https://gist.github.com/ejh/2935327
     */
    L.Control.Button = L.Control.extend({
        options: {
            //Changed location of button
            position: 'topright'
        },
        initialize: function (options) {
            this._button = {};
            this.setButton(options);
        },

        onAdd: function (map) {
            this._map = map;
            var container = L.DomUtil.create('div', 'leaflet-control-button');

            this._container = container;

            this._update();
            return this._container;
        },

        onRemove: function (map) {
        },

        setButton: function (options) {
            var button = {
                'text': options.text,                 //string
                'iconUrl': options.iconUrl,           //string
                'onClick': options.onClick,           //callback function
                'hideText': !!options.hideText,         //forced bool
                'maxWidth': options.maxWidth || 70,     //number
                'doToggle': options.doToggle,			//bool
                'toggleStatus': false					//bool
            };

            this._button = button;
            this._update();
        },

        getText: function () {
            return this._button.text;
        },

        getIconUrl: function () {
            return this._button.iconUrl;
        },

        destroy: function () {
            this._button = {};
            this._update();
        },

        toggle: function (e) {
            if (typeof e === 'boolean') {
                this._button.toggleStatus = e;
            }
            else {
                this._button.toggleStatus = !this._button.toggleStatus;
            }
            this._update();
        },

        _update: function () {
            if (!this._map) {
                return;
            }

            this._container.innerHTML = '';
            this._makeButton(this._button);

        },

        _makeButton: function (button) {
            //button is now a link for hover
            var newButton = L.DomUtil.create('a', 'leaflet-buttons-control-button', this._container);
            if (button.toggleStatus)
                L.DomUtil.addClass(newButton, 'leaflet-buttons-control-toggleon');

            var image = L.DomUtil.create('img', 'leaflet-buttons-control-img', newButton);
            image.setAttribute('src', button.iconUrl);

            if (button.text !== '') {

                L.DomUtil.create('br', '', newButton);  //there must be a better way

                var span = L.DomUtil.create('span', 'leaflet-buttons-control-text', newButton);
                var text = document.createTextNode(button.text);  //is there an L.DomUtil for this?
                span.appendChild(text);
                if (button.hideText)
                    L.DomUtil.addClass(span, 'leaflet-buttons-control-text-hide');
            }

            L.DomEvent
                .addListener(newButton, 'click', L.DomEvent.stop)
                .addListener(newButton, 'click', button.onClick, this)
                .addListener(newButton, 'click', this._clicked, this);
            L.DomEvent.disableClickPropagation(newButton);
            return newButton;

        },

        _clicked: function () {  //'this' refers to button
            if (this._button.doToggle) {
                if (this._button.toggleStatus) {	//currently true, remove class
                    L.DomUtil.removeClass(this._container.childNodes[0], 'leaflet-buttons-control-toggleon');
                }
                else {
                    L.DomUtil.addClass(this._container.childNodes[0], 'leaflet-buttons-control-toggleon');
                }
                this.toggle();
            }
            return;
        }

    });

    $scope.alert = '';

}
