const __LONG_LR = 46.1591126;
const __LATT_LR = -1.1520434;
const __ZOOM_INIT = 13;


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
/**
 * Dump data
 * Parking meter are define by a point and some relative data (cost, id, adress, ...) 
 * Those data are not currently defined **/
let pms = Array(
    {long: 46.16056, latt:-1.148586, cost: 10},
    {long: 46.15836, latt:-1.145775, cost: 5},
    {long: 46.14828, latt:-1.153564, cost: 4}
)

//Display a marker for each parking meter
pms.forEach(pm => {
    L.marker([pm.long, pm.latt]).addTo(mymap)
		.bindPopup("<b>Prix: "+pm.cost+" €/h</b>");
});
