/**
 * Created by yourilefers on 26-05-15.
 */
angular.module('org.open-doors')
	.controller('BodyController', BodyController);

// The body controller function
BodyController.$inject = ['$scope', '$mdSidenav', '$mdMedia', 'bodyService', 'homeService'];
function BodyController($scope, $mdSidenav, $mdMedia, bodyService, homeService) {

    $scope.bodyService = bodyService;
    $scope.homeService = homeService;

	// Attach
	$scope.$mdMedia = $mdMedia;

	/**
	 * Open the sidenav
	 */
	$scope.openSideNav = function () {
		$mdSidenav('left').toggle();
	};
    $scope.$watch('bodyService.allShopsActive', function() { $scope.updateAllShops() }, true);
    $scope.$watch('bodyService.allMonumentsActive', function() { $scope.updateAllMonuments() }, true);

	/**
	 * check all winkel checkboxes
	 */
    $scope.updateAllShops = function () {
        for(var i = 0; i < bodyService.shopItems.length; i++){
            bodyService.shopItems[i].active = $scope.bodyService.allShopsActive;
        }
    };

	/**
	 * check all monument checkboxes
	 */
    $scope.updateAllMonuments = function () {
        for(var i = 0; i < bodyService.monumentItems.length; i++){
            bodyService.monumentItems[i].active = $scope.bodyService.allMonumentsActive;
        }
    };

	/**
	 * Check if all checkboxes for winkel items are checked
	 */
	$scope.checkCheckedShops = function () {
		var checked = true;
		for(var i = 0; i < bodyService.shopItems.length; i++){
			if(!bodyService.shopItems[i].active) {
				checked = false;
				break;
			}
		}
		$scope.bodyService.allShopsActive = checked;
	};

	/**
	 * Check if all checkboxes for monuments are checked
	 */
	$scope.checkCheckedMonuments = function () {
		var checked = true;
		for(var i = 0; i < bodyService.monumentItems.length; i++){
			if(!bodyService.monumentItems[i].active) {
				checked = false;
				break;
			}
		}
		$scope.bodyService.allMonumentsActive = checked;
	};
}
