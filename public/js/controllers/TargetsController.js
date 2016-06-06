angular.module('GeneralX').controller('TargetsController', ["$scope", "$http", "GoogleMap", function($scope, $http, GoogleMap) {
	$scope.renderMarkers = function(endpoint) {
		$http({
		  method: 'GET',
		  url: endpoint
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
	}

	$scope.viewActive = function() {
		GoogleMap.clearAllMarkers();
		$scope.renderMarkers(API_URLS.targets.getActive);
	}

	$scope.viewDestroyed = function() {
		GoogleMap.clearAllMarkers();
		$scope.renderMarkers(API_URLS.targets.getDestroyed);
	}

	$scope.viewActive();

	$scope.spaceships = [];
	$scope.selectedShip;

	// Add a base when the map is clicked
	google.maps.event.addListener(GoogleMap.map, 'click', function(event) {
		if(!$scope.selectedShip) {
 		   alert("Please select a ship to create a target for.");
 	   } else {
		   var name = prompt("Please enter a name for this target");
		   if(name && name.length > 0) {
			   $scope.create(name, event.latLng.lat(), event.latLng.lng());
		   }
	   }
	});

	// Define what creating a base does
	$scope.create = function(name, latitude, longitude) {
		$http({
		  method: 'POST',
		  url: API_URLS.targets.createPre + $scope.selectedShip + API_URLS.targets.createPost,
		  data: {
			  name: name,
			  latitude: latitude,
			  longitude, longitude
		  }
		}).then(function successCallback(response) {
			GoogleMap.addMarker(
				{
					lat: latitude,
					lng: longitude
				},
				name,
				"/img/alien.png"
			);
		}, function errorCallback(response) {
		    console.log(response);
		});
	}

	// Get the list of all the spaceships
	$http({
	  method: 'GET',
	  url: API_URLS.spaceships.get
	}).then(function successCallback(response) {
		$scope.spaceships = response.data;
		if(response.data.length >= 1) {
			$scope.selectedShip = response.data[0].uuid;
		}
	}, function errorCallback(response) {
	    console.log(response);
	});
}]);
