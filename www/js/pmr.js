const __REMOTE_URL = new URL('http://beta.easy-park.nocturlab.fr');
const _http = new XMLHttpRequest();

//Display disabled parking spaces
//Retrieving data from server API
_http.open("GET", __REMOTE_URL + '/PlaceMR/findAll');
_http.send();
_http.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        //Handle data
        let data = JSON.parse(_http.responseText)
        addPMRToMap(data);
    } else {
        //Handle error
        console.log(this.readyState);
    }
};


function addPMRToMap(data) {
    //Display a marker for each disabled parking space
    data.forEach(dps => {
        //Convert lambert 93 to real coordinate system
        var coordinates = lambert93toWGPS(dps.pr_x, dps.pr_y)
        L.marker([coordinates.latitude, coordinates.longitude]).addTo(layerGroupMobiliteReduite).bindPopup(popup);
    });
}