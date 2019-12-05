//Display parkings meters
//Retrieving data from server API
fetch(`${__REMOTE_URL}/parkings/findAll`, {
    method: 'GET',
    headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin':'*'
    }
}).then(function(result) {
    return result.json();
}).then(function(result) {
    addParkingToMap(result);
}).catch(function(err) {
    console.error(err.message);
});

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

const myCustomColour = '#6200ee';

const markerHtmlStyles = `
    background-color: ${myCustomColour};
    width: 2rem;
    height: 2rem;
    display: block;
    left: -1rem;
    top: -1rem;
    position: relative;
    border-radius: 2rem 2rem 0;
    transform: rotate(45deg);
    border: 1px solid #FFFFFF`;

const posIcon = L.divIcon({
    className: "my-custom-pin",
    iconAnchor: [0, 24],
    labelAnchor: [-6, 0],
    popupAnchor: [0, -36],
    html: `<span style="${markerHtmlStyles}" />`
});

let lc = mymap.locate({setView: true, watch: true, maxZoom: 16});
mymap.on('locationfound', function(event) {
    console.log(event);
    var radius = event.accuracy / 2;
    L.marker(event.latlng, {icon: posIcon}).addTo(mymap);
    L.circle(event.latlng, radius).addTo(mymap);
});