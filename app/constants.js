'use strict';
angular.module('org.open-doors')
	.constant('C', {
		parkingService : {
			url: 'https://orion.smartenschede.nl/v2/entities',
			fiwareService: 'ParkingService',
			fiwareServicePath: '/nl/enschede',
            resources : {
			    "Enschede-P":  "b04a99bd-cc19-4e2c-a60f-7886ca457bad",
                "Enschede-P1": "1d3a807f-c7da-4245-b10c-0610d7f25f90",
                "Enschede-P2": "9128e1d1-a8be-4fec-80a2-78e24c897ba9",
                "Enschede-P3": "da123371-2305-4eee-9de0-993f26e649fb",
                "Enschede-P4": "3dbb7feb-405e-4595-a020-83418b9bb706",
                "Enschede-P5": "8d742616-08b2-4e42-86ba-650f91cb21fc",
                "Enschede-P6": "b2ce3aa3-0053-457f-a3e7-f9171ba37d69"
            }
			// intervalSecs: 30
		},
        groundwaterService : {
            url: 'https://orion.smartenschede.nl/v2/entities',
            fiwareService: 'GroundwaterService',
            fiwareServicePath: '/nl/enschede'
            // intervalSecs: 30
        },
        weatherService : {
            url: 'https://orion.smartenschede.nl/v2/entities?id=nl-enschede',
            fiwareService: 'WeatherService',
            fiwareServicePath: '/nl'
        },
		// URL's
		URL: {
			TEMPERATUUR: 'https://orion.smartenschede.nl/NGSI10/contextEntityTypes/temperature',
			PARKEREN: 'https://orion.smartenschede.nl/NGSI10/contextEntityTypes/parking',
            PARKERENV2: 'https://orion.smartenschede.nl/v2/entities',
			DRUKTE: 'https://orion.smartenschede.nl/NGSI10/contextEntityTypes/trafficdensity',
			WC: 'https://ckan.smartenschede.nl/dataset/d2060885-74c8-4f23-bb91-7c68bcaf5c58/resource/d96e9db0-2e83-4970-94c1-15cc2130b030/download/wcees.json',
			MOMUNEMT: 'https://ckan.smartenschede.nl/dataset/96d9cc39-d123-4b3c-8861-525d99eedf59/resource/e70e9bc4-bbc1-4710-aed0-166cf002775f/download/monumenten.json',
			MUSEA: 'https://ckan.smartenschede.nl/dataset/655e7da6-d50d-457b-9f72-aa341eb89642/resource/c7f1569c-672d-4f23-aa64-0f40f4d7cf2e/download/musea.json',
			WINKELS: 'https://ckan.smartenschede.nl/dataset/a3124a08-c56f-4e93-9d39-1736e3fbe75a/resource/4a796846-0555-4470-8bbf-a0762f4dd5ad/download/Winkels.json',
			CKAN_QUERY: 'https://ckan.smartenschede.nl/api/action/datastore_search_sql?sql='
		},

		// Intervals in seconds
		INTERVAL: {
            GROUNDWATER: 60 * 60,
			PARKEER_DATA: 30,
			DRUKTE_DATA: 30,
			TEMPERATURE_DATA: 15 * 60,
			IN_RANGE: 50
		},

		QUERY: {
			GARAGE: "https://ckan.smartenschede.nl/api/action/datastore_search_sql?sql=SELECT \"recvTimeTs\",\"attrName\",\"attrValue\"" +
				" FROM \"{resourceId}\" WHERE \"recvTimeTs\" >= {oldestTimestamp} ORDER BY \"recvTimeTs\" ASC"
		},

		// Markers
		MARKERS: {
            GROUNDWATER: {
                iconUrl: 'images/markers/water.png',
                iconSize: [32, 37], // size of the icon
                iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
                popupAnchor: [0, -37] // point from which the popup should open relative to the iconAnchor
            },
			PARKING: {
				iconUrl: 'images/markers/parkinggarage.png',
				iconSize: [32, 37], // size of the icon
				iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
				popupAnchor: [0, -37] // point from which the popup should open relative to the iconAnchor
			},
			MUSEUM: {
				iconUrl: 'images/markers/museum_art.png',
				iconSize: [32, 37], // size of the icon
				iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
				popupAnchor: [0, -37] // point from which the popup should open relative to the iconAnchor
			},
			TOILET: {
				iconUrl: 'images/markers/toilets.png',
				iconSize: [32, 37], // size of the icon
				iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
				popupAnchor: [0, -37] // point from which the popup should open relative to the iconAnchor
			},
			MONUMENT: {
				iconUrl: 'images/markers/monument.png',
				iconSize: [32, 37], // size of the icon
				iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
				popupAnchor: [0, -37] // point from which the popup should open relative to the iconAnchor
			},
			FARM: {
				iconUrl: 'images/markers/farm-2.png',
				iconSize: [32, 37], // size of the icon
				iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
				popupAnchor: [0, -37] // point from which the popup should open relative to the iconAnchor
			},
			GRAVE: {
				iconUrl: 'images/markers/catholicgrave.png',
				iconSize: [32, 37], // size of the icon
				iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
				popupAnchor: [0, -37] // point from which the popup should open relative to the iconAnchor
			},
			INDUSTRY: {
				iconUrl: 'images/markers/factory.png',
				iconSize: [32, 37], // size of the icon
				iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
				popupAnchor: [0, -37] // point from which the popup should open relative to the iconAnchor
			},
			CHURCH: {
				iconUrl: 'images/markers/church-2.png',
				iconSize: [32, 37], // size of the icon
				iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
				popupAnchor: [0, -37] // point from which the popup should open relative to the iconAnchor
			},
			HOUSE: {
				iconUrl: 'images/markers/villa.png',
				iconSize: [32, 37], // size of the icon
				iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
				popupAnchor: [0, -37] // point from which the popup should open relative to the iconAnchor
			},
			BORDER: {
				iconUrl: 'images/markers/levelcrossing.png',
				iconSize: [32, 37], // size of the icon
				iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
				popupAnchor: [0, -37] // point from which the popup should open relative to the iconAnchor
			},
			SPORT: {
				iconUrl: 'images/markers/soccer.png',
				iconSize: [32, 37], // size of the icon
				iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
				popupAnchor: [0, -37] // point from which the popup should open relative to the iconAnchor
			},
			CROSS: {
				iconUrl: 'images/markers/cross-2.png',
				iconSize: [32, 37], // size of the icon
				iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
				popupAnchor: [0, -37] // point from which the popup should open relative to the iconAnchor
			},
			SYNAGOGUE: {
				iconUrl: 'images/markers/synagogue-2.png',
				iconSize: [32, 37], // size of the icon
				iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
				popupAnchor: [0, -37] // point from which the popup should open relative to the iconAnchor
			},
			VILLA: {
				iconUrl: 'images/markers/villa.png',
				iconSize: [32, 37], // size of the icon
				iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
				popupAnchor: [0, -37] // point from which the popup should open relative to the iconAnchor
			},
			SHOES: {
				iconUrl: 'images/markers/shoes.png',
				iconSize: [32, 37], // size of the icon
				iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
				popupAnchor: [0, -37] // point from which the popup should open relative to the iconAnchor
			},
			SUPERMARKET: {
				iconUrl: 'images/markers/supermarket.png',
				iconSize: [32, 37], // size of the icon
				iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
				popupAnchor: [0, -37] // point from which the popup should open relative to the iconAnchor
			},
			ELECTRONIC: {
				iconUrl: 'images/markers/computers.png',
				iconSize: [32, 37], // size of the icon
				iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
				popupAnchor: [0, -37] // point from which the popup should open relative to the iconAnchor
			},
			CLOTHES: {
				iconUrl: 'images/markers/clothers_female.png',
				iconSize: [32, 37], // size of the icon
				iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
				popupAnchor: [0, -37] // point from which the popup should open relative to the iconAnchor
			},
			MARKET: {
				iconUrl: 'images/markers/market.png',
				iconSize: [32, 37], // size of the icon
				iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
				popupAnchor: [0, -37] // point from which the popup should open relative to the iconAnchor
			},
			HOME: {
				iconUrl: 'images/markers/homecenter.png',
				iconSize: [32, 37], // size of the icon
				iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
				popupAnchor: [0, -37] // point from which the popup should open relative to the iconAnchor
			},
			HARDWARE: {
				iconUrl: 'images/markers/tools.png',
				iconSize: [32, 37], // size of the icon
				iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
				popupAnchor: [0, -37] // point from which the popup should open relative to the iconAnchor
			},
			PERSON: {
				iconUrl: 'images/markers/you-are-here-2.png',
				iconSize: [32, 37], // size of the icon
				iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
				popupAnchor: [0, -37] // point from which the popup should open relative to the iconAnchor
			}
		}

	});
