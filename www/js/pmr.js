//Display disabled parking spaces
//Retrieving data from server API
fetch(`${__REMOTE_URL}/PlaceMR/findAll`, {
    method: 'GET',
    headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin':'*'
    }
}).then(function(result) {
    return result.json();
}).then(function(result) {
    addPMRToMap(result);
}).catch(function(err) {
    console.error(err.message);
});

let markersPmr = L.markerClusterGroup({ disableClusteringAtZoom: 17 })
layerGroupMobiliteReduite.addLayer(markersPmr);

function addPMRToMap(data) {
    //Display a marker for each disabled parking space
    data.forEach(dps => {
        //Convert lambert 93 to real coordinate system
        var coordinates = lambert93toWGPS(dps.pr_x, dps.pr_y)
        let marker =L.marker([coordinates.latitude, coordinates.longitude]);
        markersPmr.addLayer(marker);
    });
}