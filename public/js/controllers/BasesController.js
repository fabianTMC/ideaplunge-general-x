// Dashboard controller
angular.module('GeneralX').controller('BasesController', ["$scope", "$http", "GoogleMap", function($scope, $http, GoogleMap) {
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
}]);
