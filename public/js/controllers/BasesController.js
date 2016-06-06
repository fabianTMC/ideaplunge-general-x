// Dashboard controller
angular.module('GeneralX').controller('BasesController', ["$scope", "$http", function($scope, $http) {
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
	// Load information about the dataset
	$http({
	  method: 'GET',
	  url: API_URLS.bases.get
	}).then(function successCallback(response) {
		for(var i = 0; i < response.data.length; i++) {
			$scope.addMarker(
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
}]);
