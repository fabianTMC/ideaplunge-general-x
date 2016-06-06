// Dashboard controller
angular.module('GeneralX').controller('BasesController', ["$scope", "$http", "GoogleMap", function($scope, $http, GoogleMap) {
	$scope.renderMarkers = function() {
		$http({
		  method: 'GET',
		  url: API_URLS.bases.get
		}).then(function successCallback(response) {
			for(var i = 0; i < response.data.length; i++) {
				GoogleMap.addMarker(
					{
						lat: response.data[i].latitude,
						lng: response.data[i].longitude
					},
					response.data[i].name,
					"/img/base.png"
				);
			}
		}, function errorCallback(response) {
		    console.log(response);
		});
	}

	// Add a base when the map is clicked
	google.maps.event.addListener(GoogleMap.map, 'click', function(event) {
	   var name = prompt("Please enter a name for this base");
	   if(name && name.length > 0) {
		   $scope.create(name, event.latLng.lat(), event.latLng.lng());
	   }
	});

	// Define what creating a base does
	$scope.create = function(name, latitude, longitude) {
		$http({
		  method: 'POST',
		  url: API_URLS.bases.create,
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
				"/img/base.png"
			);
		}, function errorCallback(response) {
		    console.log(response);
		});
	}

	$scope.renderMarkers();
}]);
