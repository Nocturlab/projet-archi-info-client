//Affichage des  places disponibles en temps reel

// plugin cordova envoie position utilisateur au serveur
//https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-geolocation/

//us7
function httpGet(theUrl)
{
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
/*
//   Retrieve the user position
    //
    let onSuccess = function(position) {
        alert('Latitude: '          + position.coords.latitude          + '\n' +
              'Longitude: '         + position.coords.longitude         + '\n' );
              
             console.log(httpGet("http://easy-park.nocturlab.fr/parkings/search/findByUserPos?pos_x="+position.coords.latitude+"&pos_y="+position.coords.longitude+"&range=500&page=1&size=20&sort=id"));
    };


    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
*/

// US2


//Convertir les coordonnées de LAMBERT 93 vers WGS84 !!
//https://github.com/proj4js/proj4js
// Stocker les valeurs dans un tableau


function coordinatesConverter(jsonData) {
    let coordinates = [];
    
    let firstProjection = "+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs";
    let secondProjection = "+proj=longlat +datum=WGS84 +no_defs";



    for (i = 0; i < jsonData.data.length; i++) {

        coordinates.push(proj4( secondProjection,firstProjection, [jsonData.data[i].dp_x, jsonData.data[i].dp_y]));
    }
    return coordinates
}

//let coordinates = coordinatesConverter(jsonData);


/*
for (let i = 0; i < coordinates.length; i++) {
  // TODO afficher nombre de places restantes et le libelle 
  // TODO le user selectionne un point et affichage de l'itinéraire https://www.liedman.net/leaflet-routing-machine/tutorials/basic-usage/
    L.marker([coordinates[i][1], coordinates[i][0]]).addTo(map)
    .bindPopup('Parking.<br>')
    .openPopup();
    
    
}*/

// afficher sur la map

let map = L.map('map').setView([46.155468, -1.156428], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
// add location control to global name space for testing only
//https://github.com/dpa99c/phonegap-launch-navigator
 let lc = L.control.locate().addTo(map)

map.on('locationfound', onLocationFound);
function onLocationFound(e) {

    let jsonData = {
        "data": [
            {
                "dp_y": e.latlng.lat,
                "dp_x": e.latlng.lng
                
            }]
    }
    
    let coordinates = coordinatesConverter(jsonData);
console.log(coordinates[0]);
    fetch("http://beta.easy-park.nocturlab.fr/parkings/findNearestParking?lat="+coordinates[0][0]+"&lng="+coordinates[0][1]+"&dist=20000").then(function(result) {
        return result.json();
    }).then(function(result) {
        console.log(result);
    }).catch(function(err) {
        console.error(err);
    });

}

//todo affichage des parkings + au click lunch navigator

//link itineraire vers ce lieu pour lancer le routing entre current position et parking
//https://github.com/dpa99c/phonegap-launch-navigator
//installer le plugin GOOGLE_API_KEY_FOR_ANDROID
//Tester sur mobile le launchnavigator
window.addEventListener('ready', function () {
launchnavigator.navigate([50.279306, -5.163158], {
    start: "50.342847, -4.749904"
});

})



