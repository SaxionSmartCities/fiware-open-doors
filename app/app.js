'use strict';

// Declare app level module which depends on views, and components
'use strict';
angular.module('org.open-doors', [
    'ngRoute',              // Angular routing of pages
    'ngAnimate',            // Animation support
    'ngAria',            // Animation support
	'ngMaterial',
	'ui-leaflet',
	'chart.js',
	'angAccordion',
    'nemLogging'
])
	.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
}]);


