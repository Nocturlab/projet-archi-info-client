const __LONG_LR = 46.1591126;
const __LATT_LR = -1.1520434;
const __ZOOM_INIT = 13;
const __REMOTE_URL = new URL('http://beta.easy-park.nocturlab.fr');
const _http = new XMLHttpRequest();


//Create the map
let mymap = L.map('mapid').setView([__LONG_LR, __LATT_LR], __ZOOM_INIT);

//add a tile layer 
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
}).addTo(mymap);

//Display parkings meters
//Retrieving data from server API
let pms;
_http.open("GET", __REMOTE_URL+'horodateurs/findAll');
_http.send();
_http.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
        //Handle data 
        // let data = JSON.parse(_http.responseText)

    } else{
        //Handle error
        console.log(_http.responseText);
    }
}

/**
 * Dump data
 * Parking meter are define by a point and some relative data (cost, id, adress, ...) 
 * Those data are not currently defined 
 **/
let pmsJson = { "data": [
    {"hor_id": 1, "hor_numero": 1, "hor_voie_libelle": "rue A", "hor_type": "A", "hor_alimentation": "solaire", "hor_zone": "bleue", "hor_x": 46.16056, "hor_y": -1.148586},
    {"hor_id": 2, "hor_numero": 2, "hor_voie_libelle": "rue B", "hor_type": "S", "hor_alimentation": "mécanique", "hor_zone": "rouge", "hor_x": 46.15836, "hor_y": -1.145775},
    {"hor_id": 3, "hor_numero": 3, "hor_voie_libelle": "rue C", "hor_type": "E", "hor_alimentation": "nucléaire", "hor_zone": "arc-en-ciel", "hor_x": 46.14828, "hor_y": -1.153564},
]};
pms = pmsJson.data;

//Display a marker for each parking meter
pms.forEach(pm => {
    let popup = "<b>Numéro: "+pm.hor_numero+"</b></br>"+
    "<b>Voie: "+pm.hor_voie_libelle+"</b></br>"+
    "<b>Type: "+pm.hor_type+"</b></br>"+
    "<b>Alimentation: "+pm.hor_alimentation+"</b></br>"+
    "<b>Zone: "+pm.hor_zone+"</b></br>";

    L.marker([pm.hor_x, pm.hor_y]).addTo(mymap).bindPopup(popup);
});
