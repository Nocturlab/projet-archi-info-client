//Display parkings meters
//Retrieving data from server API
let httpParking = new XMLHttpRequest();
httpParking.open("GET", __REMOTE_URL + '/parkings/all');
httpParking.send();
httpParking.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        //Handle data
        let data = JSON.parse(httpParking.responseText)
        addParkingToMap(data);
    } else {
        //Handle error
        console.error(this.readyState);
    }
};

function addParkingToMap(data) {
    data.forEach(pm => {
        //Convert lambert 93 to real coordinate system
        let coordinates = lambert93toWGPS(pm.parking_x, pm.parking_y)
        let popup = "<b>Numéro de parking: " + pm.parking_libelle + "</b></br>" +
            "<b>Voie: " + pm.parking_libelle + "</b></br>" +
            "<b>Type: " + pm.parking_type + "</b></br>" +
            "<b>Nombre de places: " + pm.parking_nb_places + "</b></br>";

        if (pm.parking_nb_place_reel !== "NULL") {
            popup += "<b>Nombre de places libres: " + pm.parking_nb_place_reel + "</b></br>";
        }
        L.marker([coordinates.latitude, coordinates.longitude]).addTo(layerGroupParkings).bindPopup(popup);
    });
}