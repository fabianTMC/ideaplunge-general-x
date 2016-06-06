// Dashboard controller
angular.module('GeneralX').controller('TrackController', ["$scope", "$http", "GoogleMap", function($scope, $http, GoogleMap) {
	$scope.spaceships = [];
	$scope.selectedShip;

	// Load all spaceships
	$http({
	  method: 'GET',
	  url: API_URLS.spaceships.get
	}).then(function successCallback(response) {
		$scope.spaceships = response.data;
		if(response.data.length >= 1) {
			$scope.selectedShip = response.data[0].uuid;
		}

		for(var i = 0; i < response.data.length; i++) {
			GoogleMap.addMarker(
				{
					lat: response.data[i].currentLatitude,
					lng: response.data[i].currentLongitude
				},
				response.data[i].name,
				"/img/spaceship.png",
				response.data[i].uuid
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
				"/img/alien.png",
				response.data[i].uuid,
				false
			);
		}
	}, function errorCallback(response) {
	    console.log(response);
	});

	// Add a base when the map is clicked
	google.maps.event.addListener(GoogleMap.map, 'click', function(event) {
		if(!$scope.selectedShip) {
 		   alert("Please select a ship to create a target for.");
 	   } else {
		   $scope.track(event.latLng.lat(), event.latLng.lng());
	   }
	});

	// Track the spaceship
	$scope.track = function(latitude, longitude) {
		$http({
		  method: 'POST',
		  url: API_URLS.spaceships.trackPre + $scope.selectedShip + API_URLS.spaceships.trackPost,
		  data: {
			  latitude: latitude,
			  longitude, longitude
		  }
		}).then(function successCallback(response) {
			var index = GoogleMap.findIndexByProperty("uuid", $scope.selectedShip);
			var obj = GoogleMap.markers[index];
			if(index != -1) {
				GoogleMap.clearMarker(index);

				GoogleMap.addMarker(
					{
						lat: latitude,
						lng: longitude
					},
					obj.name,
					"/img/spaceship.png",
					obj.uuid
				);
			}
		}, function errorCallback(response) {
		    console.log(response);
		});
	}
}]);
