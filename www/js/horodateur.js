const __REMOTE_URL = new URL('http://beta.easy-park.nocturlab.fr');
const _http = new XMLHttpRequest();

//Display parkings meters
//Retrieving data from server API
_http.open("GET", __REMOTE_URL + '/horodateurs/findAll');
_http.send();
_http.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        //Handle data
        let data = JSON.parse(_http.responseText);
        addHorodateurToMap(data);
    } else {
        //Handle error
        console.log(this.readyState);
    }
};

var iconHorodateur = L.icon({
    iconUrl: 'img/horodateur.png',
    iconSize:     [20, 30],
});

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

        L.marker([coordinates.latitude, coordinates.longitude], {icon: iconHorodateur}).addTo(layerGroupHorodateur).bindPopup(popup);
    });
}

