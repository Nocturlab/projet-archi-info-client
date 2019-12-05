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
    console.log(data);
    data.forEach(pm => {
        //Convert lambert 93 to real coordinate system
        let coordinates = lambert93toWGPS(pm.dp_x, pm.dp_y);
        let popup = "<b>Numéro de parking: " + pm.dp_parc_id + "</b></br>" +
            "<b>Voie: " + pm.dp_libelle + "</b></br>" +
            "<b>Type: " + pm.type + "</b></br>" +
            "<b>Nombre de places: " + pm.dp_nb_places + "</b></br>";

        if (pm.dp_place_disponible !== "NULL")
            popup += "<b>Nombre de places libres: " + pm.dp_place_disponible + "</b></br>";
            
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

let currentPosMarker = null;
mymap.locate({setView: false, watch: true, maxZoom: 16});

mymap.on('locationfound', function(event) {
    var radius = event.accuracy / 2;
    
    if(currentPosMarker)
        currentPosMarker.forEach(layer=>mymap.removeLayer(layer));
    
    currentPosMarker = [];
    
    currentPosMarker[0] = L.marker(event.latlng, {icon: posIcon});
    currentPosMarker[0].addTo(mymap);
    
    currentPosMarker[1] = L.circle(event.latlng, radius);
    currentPosMarker[1].addTo(mymap);
});
