/**
 * Created by yourilefers on 26-05-15.
 */
angular.module('org.open-doors')
	.factory('bodyService', bodyService);

// The body service
bodyService.$inject = [];
function bodyService() {

	// The service
	var service = {};
    service.allMonumentsActive = false;
    service.allShopsActive = false;

	// The list of items
	service.listItems = [
		{
			id: 0,
			title: 'Parkeerplaatsen',
			system: 'parkeerplaatsen',
			active: false
		},{
			id: 1,
			title: 'Openbare toiletten',
			system: 'toiletten',
			active: true
		},{
			id: 2,
			title: 'Musea',
			system: 'musea',
			active: false
        // }, {
        //     id: 3,
        //     title: 'Verkeersdrukte',
        //     system: 'verkeersdrukte',
        //     active: false
		}, {
			id: 4,
			title: 'Grondwater',
			system: 'grondwaterstanden',
			active: false
		}
	];

	// list of shop categories
	service.shopItems = [
		{
			id: 0,
			title: 'Kleding',
			system: 'kleding',
			active: false
		},
		{
			id: 1,
			title: 'Electronica',
			system: 'electronica',
			active: false
		},
		{
			id: 2,
			title: 'Schoenen',
			system: 'schoenen',
			active: false
		},
		{
			id: 3,
			title: 'Supermarkt',
			system: 'supermarkt',
			active: false
		},
		{
			id: 4,
			title: 'Meubel',
			system: 'meubel',
			active: false
		},
		{
			id: 5,
			title: 'Bouwmarkt',
			system: 'bouwmarkt',
			active: false
		},
		{
			id: 6,
			title: 'Overig',
			system: 'overig',
			active: false
		}
	];

	// list of monument categories
	service.monumentItems = [
		{
			id: 0,
			title: 'Boerderijen',
			system: 'boerderijen',
			active: false
		},
		{
			id: 1,
			title: 'Begraafplaatsen',
			system: 'begraafplaatsen',
			active: false
		},
		{
			id: 2,
			title: 'Industrieën',
			system: 'industrieen',
			active: false
		},
		{
			id: 3,
			title: 'Kloosters',
			system: 'kloosters',
			active: false
		},
		{
			id: 4,
			title: 'Grensafbakeningen',
			system: 'grensafbakeningen',
			active: false
		},
		{
			id: 5,
			title: 'Sport en recreatie',
			system: 'sport',
			active: false
		},
		{
			id: 6,
			title: 'Kerken',
			system: 'kerken',
			active: false
		},
		{
			id: 7,
			title: 'Woonhuizen',
			system: 'woonhuizen',
			active: false
		},
		{
			id: 8,
			title: 'Synagoges',
			system: 'synagoges',
			active: false
		},
		{
			id: 9,
			title: 'Overige',
			system: 'overige',
			active: false
		}
	];

	return service;
}
