// Dashboard controller
angular.module('GeneralX').controller('DashboardController', ["$scope", "$http", "GoogleMap", function($scope, $http, GoogleMap) {
	// Load all spaceships
	$http({
	  method: 'GET',
	  url: API_URLS.spaceships.get
	}).then(function successCallback(response) {
		for(var i = 0; i < response.data.length; i++) {
			GoogleMap.addMarker(
				{
					lat: response.data[i].currentLatitude,
					lng: response.data[i].currentLongitude
				},
				response.data[i].name,
				"/img/spaceship.png"
			);
		}
	}, function errorCallback(response) {
	    console.log(response);
	});

	// Load all active targets
	$http({
	  method: 'GET',
	  url: API_URLS.targets.getActive
	}).then(function successCallback(response) {
		for(var i = 0; i < response.data.length; i++) {
			GoogleMap.addMarker(
				{
					lat: response.data[i].latitude,
					lng: response.data[i].longitude
				},
				response.data[i].name,
				"/img/alien.png"
			);
		}
	}, function errorCallback(response) {
	    console.log(response);
	});
}]);
