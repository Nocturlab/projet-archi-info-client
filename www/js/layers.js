let layerGroupHorodateur = L.layerGroup();
let layerGroupTempsReel = L.layerGroup();
let layerGroupMobiliteReduite = L.layerGroup();

let overlayMaps = {
    "Places en temps réel": layerGroupTempsReel,
    "Horodateur": layerGroupHorodateur,
    "Places à mobilité réduite": layerGroupMobiliteReduite
};

L.control.layers(null, overlayMaps).addTo(mymap);
function test(){
    if(mymap.getZoom()> 15){
        layerGroupHorodateur.addTo(mymap);
    } else {
        mymap.removeLayer(layerGroupHorodateur)
    }
}
mymap.on("zoomend", test);