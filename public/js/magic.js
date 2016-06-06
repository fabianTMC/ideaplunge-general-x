////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
///////////////////////////// API CONFIG ///////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
var API_URLS = {
	"bases": {
		"get": "/api/bases/get"
	},
	"spaceships": {
		"get": "/api/spaceships/get"
	},
	"targets": {
		"getActive": "/api/targets/get-active",
		"getDestroyed": "/api/targets/get-destroyed",
	},
};

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////// AngularJS ///////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
var GeneralX = angular.module('GeneralX', []);

angular.module("GeneralX").service('GoogleMap', function() {
	var factory = {};

	// Keep track of all the markers
	factory.markers = [];

	// Where is the map's home?
	factory.home = { lat: 12.97, lng: 77.59 };

	// Instantiate the map
	factory.map = new google.maps.Map(
		document.getElementById('map'),
		{
			zoom: 12,
	  		center: factory.home
		}
	);

	// Add a marker to the map.
	factory.addMarker = function(location, title, icon) {
		// Add the marker at the clicked location, and add the next-available label
		// from the array of alphabetical characters.
		var marker = new google.maps.Marker({
		  position: location,
		  title: title,
		  icon: icon,
		  map: factory.map
		});

		factory.markers.push(marker);
	}

	// Clear all the markers
	factory.clearAllMarkers = function() {
		for (var i = 0; i < factory.markers.length; i++) {
			factory.markers[i].setMap(null);
		}

		factory.markers = [];
	}

	return factory;

 });

// manually boot the angular app when it is ready
var injector;
angular.element(document).ready(function() {
    // Boot the angular app
    injector = angular.bootstrap(document, ['GeneralX']);
});
