//Display parkings meters
//Retrieving data from server API

let httpHorodateur = new XMLHttpRequest();
httpHorodateur.open("GET", __REMOTE_URL + '/horodateurs/findAll');
httpHorodateur.send();
httpHorodateur.onreadystatechange = function(){
    if (this.readyState === 4 && this.status === 200) {
        //Handle data
        let data = JSON.parse(httpHorodateur.responseText)
        addHorodateurToMap(data);
    } else {
        //Handle error
        console.error(this.readyState);
    }
};

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

