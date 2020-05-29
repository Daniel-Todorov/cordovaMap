var app = {
    apiUrl: 'http://small-bush-38.getsandbox.com/',
    map: {},
    userConfig: {},
    markers: [],
    appliedMarkers: [],
    currentZoomLevel: 8,
    thresholdLevel: 10,
    onDeviceReady: function () {

        app.getSettings()
            .then(app.getMarkers)
            .then(app.initializeMap);
    },
    initializeMap: function () {
        var mapContainer = document.getElementById("map");

        app.map = plugin.google.maps.Map.getMap(mapContainer, {
            'camera': {
                'latLng': app.userConfig,
                'zoom': app.currentZoomLevel
            },
            'gestures': {
                'zoom': true
            },
            'controls': {
                zoom: true
            }
        });
        
        app.map.on(plugin.google.maps.event.CAMERA_CHANGE, function (camera) {
            if (app.currentZoomLevel < app.thresholdLevel && camera.zoom >= app.thresholdLevel) {
                app.markers.forEach(function (marker) {
                    app.map.addMarker(marker, function(marker) {
                        app.appliedMarkers.push(marker);
                    });
                });
            } else if (app.currentZoomLevel >= app.thresholdLevel && camera.zoom < app.thresholdLevel) {
                app.map.clear();
            }

            app.currentZoomLevel = camera.zoom;
        });

        app.map.on(plugin.google.maps.event.MAP_LONG_CLICK, function (clickPosition) {
            app.subroutine(clickPosition);
        });
    },
    subroutine: function (clickPosition) {
        app.map.getCameraPosition(function (camera) {
            app.map.moveCamera({
                'target': clickPosition,
                'zoom': camera.zoom + 1
            })
        });
    },
    getSettings: function () {
        return $.getJSON(app.apiUrl + 'user-settings').then(function (response) {
            app.userConfig = response;
        })
    },
    getMarkers: function () {
        return $.getJSON(app.apiUrl + 'markers').then(function (response) {
            app.markers = response;
        })
    }
};

document.addEventListener('deviceready', app.onDeviceReady);