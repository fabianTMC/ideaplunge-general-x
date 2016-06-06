////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
///////////////////////////// API CONFIG ///////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
var API_URLS = {
	"bases": {
		"get": "/api/bases/get",
		"create": "/api/bases/create"
	},
	"spaceships": {
		"get": "/api/spaceships/get",
		"create": "/api/spaceships/create",
		"trackPre": "/api/spaceships/",
		"trackPost": "/track",
	},
	"targets": {
		"createPre": "/api/spaceships/",
		"createPost": "/target",
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
	factory.addMarker = function(location, title, icon, uuid, clickable) {
		clickable = (clickable == undefined) ? true : clickable;
		// Add the marker at the clicked location, and add the next-available label
		// from the array of alphabetical characters.
		var marker = new google.maps.Marker({
		  position: location,
		  title: title,
		  icon: icon,
		  map: factory.map,
		  uuid: uuid,
		  clickable: clickable
		});

		factory.markers.push(marker);
	}

	// Find a marker by a key and value
	factory.findIndexByProperty = function(key, value) {
		return factory.markers.map(function(el) {
		  return el[key];
	  }).indexOf(value);
	}

	// Clear a specific marker
	factory.clearMarker = function(index) {
		factory.markers[index].setMap(null);
		factory.markers.splice(index, 1);
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
