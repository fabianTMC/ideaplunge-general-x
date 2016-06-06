// Dashboard controller
angular.module('GeneralX').controller('DashboardController', ["$scope", "$http", function($scope, $http) {
	var bangalore = { lat: 12.97, lng: 77.59 };

	$scope.map = new google.maps.Map(
		document.getElementById('map'),
		{
			zoom: 12,
	  		center: bangalore
		}
	);

	// What happens when the map is clicked?
	google.maps.event.addListener($scope.map, 'click', function(event) {
		console.log(event.latLng.lat());
		console.log(event.latLng.lng());
	});

	// Add a marker to the map.
	$scope.addMarker = function(location, title, icon) {
		// Add the marker at the clicked location, and add the next-available label
		// from the array of alphabetical characters.
		var marker = new google.maps.Marker({
		  position: location,
		  title: title,
		  icon: icon,
		  map: $scope.map
		});
	}

	// -----------------------------------------
	// --- LOGIC TO RUN WHEN THE PAGE LOADS ---
	// -----------------------------------------

	// Load all spaceships
	$http({
	  method: 'GET',
	  url: API_URLS.spaceships.get
	}).then(function successCallback(response) {
		for(var i = 0; i < response.data.length; i++) {
			$scope.addMarker(
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
			$scope.addMarker(
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
