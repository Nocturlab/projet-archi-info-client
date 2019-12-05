//Display parkings meters
//Retrieving data from server API

fetch(`${__REMOTE_URL}/horodateurs/findAll`, {
    method: 'GET',
    headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin':'*'
    }
}).then(function(result) {
    return result.json();
}).then(function(result) {
    addHorodateurToMap(result);
}).catch(function(err) {
    console.error(err.message);
});

let markers = L.markerClusterGroup({ disableClusteringAtZoom: 17 })

function addHorodateurToMap(data) {
    //Display a marker for each parking meter
    data.forEach(pm => {
        //Convert lambert 93 to real coordinate system
        let coordinates = lambert93toWGPS(pm.hor_x, pm.hor_y);
        let popup = "<b>Numéro: " + pm.hor_numero + "</b></br>" +
            "<b>Voie: " + pm.hor_voie_libelle + "</b></br>" +
            "<b>Type: " + pm.hor_type + "</b></br>" +
            "<b>Alimentation: " + pm.hor_alimentation + "</b></br>" +
            "<b>Zone: " + pm.hor_zone + "</b></br>";

        let marker = L.marker([coordinates.latitude, coordinates.longitude]).bindPopup(popup);
        markers.addLayer(marker)
        layerGroupHorodateur.addLayer(markers)
    });
}

