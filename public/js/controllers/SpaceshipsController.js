angular.module('GeneralX').controller('SpaceshipsController', ["$scope", "$http", "GoogleMap", function($scope, $http, GoogleMap) {
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
}]);
