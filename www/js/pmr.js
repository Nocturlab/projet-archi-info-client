//Display disabled parking spaces
//Retrieving data from server API
let httpPMR = new XMLHttpRequest();
httpPMR.open("GET", __REMOTE_URL + '/PlaceMR/findAll');
httpPMR.send();
httpPMR.onreadystatechange = function(){
    if (this.readyState === 4 && this.status === 200) {
        //Handle data
        let data = JSON.parse(httpPMR.responseText)
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
        L.marker([coordinates.latitude, coordinates.longitude]).addTo(layerGroupMobiliteReduite);
    });
}