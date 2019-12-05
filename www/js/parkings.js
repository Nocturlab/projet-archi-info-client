(function(){
    const __REMOTE_URL = new URL('http://api.beta.easy-park.nocturlab.fr');

//Display parkings meters
//Retrieving data from server API

mymap.on('locationfound', function(event) {
    var radius = event.accuracy / 2;
    L.marker(event.latlng).addTo(map)
     .bindPopup("You are within " + radius + " meters from this point").openPopup();
    L.circle(event.latlng, radius).addTo(map);
    
    const coordinates = coordinatesConverter({
        "data": [{
                "dp_y": event.latlng.lat,
                "dp_x": event.latlng.lng
            }]
    });

    fetch(`${__REMOTE_URL}/parkings/findNearestParking?lat=${coordinates[0][0]}&lng=${coordinates[0][1]}&dist=2000000`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin':'*'
        }
    }).then(function(result) {
        return result.json();
    }).then(function(result) {
        addParkingsToMap(result);
    }).catch(function(err) {
        console.error(err.message);
    });
});

let lc = L.control.locate({setView: true, watch: true, maxZoom: 8}).addTo(mymap);

// mymap.fire('locationfound', { latlng: {
//     lat: 46.1476498,
//     lng: -1.1571302
// }});

function addParkingsToMap(data) {
    //Display a marker for each parking
    data.forEach(pm => {
        //Convert lambert 93 to real coordinate system
        console.log(pm);
        var coordinates = coordinatesConverter({
            "data": [{
                "dp_y": pm.parking_x,
                "dp_x": pm.parking_y
            }]
        });
        // { parking_nb_place_reel: "NULL", parking_nom: "Notre Dame", parking_y: 6571168.9935984, parking_id: 6, parking_libelle: "Notre Dame", parking_tarification: 0, parking_x: 380264.749348153, parking_type: "parking gratuit", parking_nb_places: 150 }
        let popup = "<b>Numéro: " + pm.parking_id + "</b></br>" +
            "<b>Voie: " + pm.parking_nom + "</b></br>" +
            "<b>Type: " + pm.type + "</b></br>" +
            "<b>Place Disponible: " + pm.parking_nb_place_reel +"/"+ pm.parking_nb_places+ "</b></br>" +
            "<b>Tarification: " + pm.tarification +"</b></br>";

        L.marker([coordinates.latitude, coordinates.longitude]).addTo(layerGroupTempsReel).bindPopup(popup);
    });
}

function coordinatesConverter(jsonData) {
    let coordinates = [];
    
    let firstProjection = "+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs";
    let secondProjection = "+proj=longlat +datum=WGS84 +no_defs";



    for (i = 0; i < jsonData.data.length; i++) {

        coordinates.push(proj4( secondProjection,firstProjection, [jsonData.data[i].dp_x, jsonData.data[i].dp_y]));
    }
    return coordinates
}

})();
