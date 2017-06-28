angular.module('org.open-doors')
	.constant('C', {
		parkingService : {
			url: 'http://orion.iot.yaath.com/v2/entities',
			fiwareService: 'ParkingService',
			fiwareServicePath: '/nl/enschede'
			// intervalSecs: 30
		},
        groundwaterService : {
            url: 'http://orion.smartenschede.nl/v2/entities',
            fiwareService: 'GroundwaterService',
            fiwareServicePath: '/nl/enschede'
            // intervalSecs: 30
        },
        weatherService : {
            url: 'http://orion.smartenschede.nl/v2/entities?id=nl-enschede',
            fiwareService: 'WeatherService',
            fiwareServicePath: '/'
        },
		// URL's
		URL: {
			TEMPERATUUR: 'http://orion.iot.yaath.com/NGSI10/contextEntityTypes/temperature',
			PARKEREN: 'http://orion.iot.yaath.com/NGSI10/contextEntityTypes/parking',
            PARKERENV2: 'http://orion.iot.yaath.com/v2/entities',
			DRUKTE: 'http://orion.iot.yaath.com/NGSI10/contextEntityTypes/trafficdensity',
			WC: 'http://ckan.iot.yaath.com/dataset/d2060885-74c8-4f23-bb91-7c68bcaf5c58/resource/d96e9db0-2e83-4970-94c1-15cc2130b030/download/wcees.json',
			MOMUNEMT: 'http://ckan.iot.yaath.com/dataset/96d9cc39-d123-4b3c-8861-525d99eedf59/resource/e70e9bc4-bbc1-4710-aed0-166cf002775f/download/monumenten.json',
			MUSEA: 'http://ckan.iot.yaath.com/dataset/655e7da6-d50d-457b-9f72-aa341eb89642/resource/c7f1569c-672d-4f23-aa64-0f40f4d7cf2e/download/musea.json',
			WINKELS: 'http://ckan.iot.yaath.com/dataset/a3124a08-c56f-4e93-9d39-1736e3fbe75a/resource/4a796846-0555-4470-8bbf-a0762f4dd5ad/download/Winkels.json',
			CKAN_QUERY: 'http://ckan.iot.yaath.com/api/action/datastore_search_sql?sql='
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
			GARAGE: "SELECT round(avg(free_spots)) FROM \"fa96f9fa-011d-43ff-ad28-77ea5b09882a\" WHERE name = '{n}' AND last_update > {st} AND last_update < {et}",
			TEMPERATURE: "SELECT round(avg(temperature)) FROM \"db47c555-1ead-4e68-8538-24fb8bd01b33\" WHERE last_update > {st} AND last_update < {et}"
		},

		// Markers
		MARKERS: {
            GROUNDWATER: {
                iconUrl: 'img/markers/water.png',
                iconSize: [32, 37], // size of the icon
                iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
                popupAnchor: [0, -37] // point from which the popup should open relative to the iconAnchor
            },
			PARKING: {
				iconUrl: 'img/markers/parkinggarage.png',
				iconSize: [32, 37], // size of the icon
				iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
				popupAnchor: [0, -37] // point from which the popup should open relative to the iconAnchor
			},
			MUSEUM: {
				iconUrl: 'img/markers/museum_art.png',
				iconSize: [32, 37], // size of the icon
				iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
				popupAnchor: [0, -37] // point from which the popup should open relative to the iconAnchor
			},
			TOILET: {
				iconUrl: 'img/markers/toilets.png',
				iconSize: [32, 37], // size of the icon
				iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
				popupAnchor: [0, -37] // point from which the popup should open relative to the iconAnchor
			},
			MONUMENT: {
				iconUrl: 'img/markers/monument.png',
				iconSize: [32, 37], // size of the icon
				iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
				popupAnchor: [0, -37] // point from which the popup should open relative to the iconAnchor
			},
			FARM: {
				iconUrl: 'img/markers/farm-2.png',
				iconSize: [32, 37], // size of the icon
				iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
				popupAnchor: [0, -37] // point from which the popup should open relative to the iconAnchor
			},
			GRAVE: {
				iconUrl: 'img/markers/catholicgrave.png',
				iconSize: [32, 37], // size of the icon
				iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
				popupAnchor: [0, -37] // point from which the popup should open relative to the iconAnchor
			},
			INDUSTRY: {
				iconUrl: 'img/markers/factory.png',
				iconSize: [32, 37], // size of the icon
				iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
				popupAnchor: [0, -37] // point from which the popup should open relative to the iconAnchor
			},
			CHURCH: {
				iconUrl: 'img/markers/church-2.png',
				iconSize: [32, 37], // size of the icon
				iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
				popupAnchor: [0, -37] // point from which the popup should open relative to the iconAnchor
			},
			HOUSE: {
				iconUrl: 'img/markers/villa.png',
				iconSize: [32, 37], // size of the icon
				iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
				popupAnchor: [0, -37] // point from which the popup should open relative to the iconAnchor
			},
			BORDER: {
				iconUrl: 'img/markers/levelcrossing.png',
				iconSize: [32, 37], // size of the icon
				iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
				popupAnchor: [0, -37] // point from which the popup should open relative to the iconAnchor
			},
			SPORT: {
				iconUrl: 'img/markers/soccer.png',
				iconSize: [32, 37], // size of the icon
				iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
				popupAnchor: [0, -37] // point from which the popup should open relative to the iconAnchor
			},
			CROSS: {
				iconUrl: 'img/markers/cross-2.png',
				iconSize: [32, 37], // size of the icon
				iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
				popupAnchor: [0, -37] // point from which the popup should open relative to the iconAnchor
			},
			SYNAGOGUE: {
				iconUrl: 'img/markers/synagogue-2.png',
				iconSize: [32, 37], // size of the icon
				iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
				popupAnchor: [0, -37] // point from which the popup should open relative to the iconAnchor
			},
			VILLA: {
				iconUrl: 'img/markers/villa.png',
				iconSize: [32, 37], // size of the icon
				iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
				popupAnchor: [0, -37] // point from which the popup should open relative to the iconAnchor
			},
			SHOES: {
				iconUrl: 'img/markers/shoes.png',
				iconSize: [32, 37], // size of the icon
				iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
				popupAnchor: [0, -37] // point from which the popup should open relative to the iconAnchor
			},
			SUPERMARKET: {
				iconUrl: 'img/markers/supermarket.png',
				iconSize: [32, 37], // size of the icon
				iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
				popupAnchor: [0, -37] // point from which the popup should open relative to the iconAnchor
			},
			ELECTRONIC: {
				iconUrl: 'img/markers/computers.png',
				iconSize: [32, 37], // size of the icon
				iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
				popupAnchor: [0, -37] // point from which the popup should open relative to the iconAnchor
			},
			CLOTHES: {
				iconUrl: 'img/markers/clothers_female.png',
				iconSize: [32, 37], // size of the icon
				iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
				popupAnchor: [0, -37] // point from which the popup should open relative to the iconAnchor
			},
			MARKET: {
				iconUrl: 'img/markers/market.png',
				iconSize: [32, 37], // size of the icon
				iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
				popupAnchor: [0, -37] // point from which the popup should open relative to the iconAnchor
			},
			HOME: {
				iconUrl: 'img/markers/homecenter.png',
				iconSize: [32, 37], // size of the icon
				iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
				popupAnchor: [0, -37] // point from which the popup should open relative to the iconAnchor
			},
			HARDWARE: {
				iconUrl: 'img/markers/tools.png',
				iconSize: [32, 37], // size of the icon
				iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
				popupAnchor: [0, -37] // point from which the popup should open relative to the iconAnchor
			},
			PERSON: {
				iconUrl: 'img/markers/you-are-here-2.png',
				iconSize: [32, 37], // size of the icon
				iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
				popupAnchor: [0, -37] // point from which the popup should open relative to the iconAnchor
			}
		}

	});
