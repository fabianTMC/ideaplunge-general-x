angular.module('GeneralX').controller('SpaceshipsController', ["$scope", "$http", "GoogleMap", function($scope, $http, GoogleMap) {
	$scope.bases = [];
	$scope.selectedBase;

	// Define what creating a base does
	$scope.create = function() {
		if(!$scope.selectedBase) {
 		   alert("Please select a base to add a spaceship for.");
 	   } else {
 		   var name = prompt("Please enter a name for this spaceship");

		   if(name && name.length > 0) {
			   $http({
		   		  method: 'POST',
		   		  url: API_URLS.spaceships.create,
		   		  data: {
		   			  name: name,
		   			  homeBase: $scope.selectedBase
		   		  }
		   		}).then(function successCallback(response) {
		   			$scope.renderMarkers();
		   		}, function errorCallback(response) {
		   		    console.log(response);
		   		});
 		   }
 	   }
	}

	$scope.renderMarkers = function() {
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
	}

	$scope.renderMarkers();

	// Get the list of all the bases
	$http({
	  method: 'GET',
	  url: API_URLS.bases.get
	}).then(function successCallback(response) {
		$scope.bases = response.data;
		if(response.data.length >= 1) {
			$scope.selectedBase = response.data[0].uuid;
		}
	}, function errorCallback(response) {
	    console.log(response);
	});
}]);
