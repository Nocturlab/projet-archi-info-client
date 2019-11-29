let layerGroupHorodateur = L.layerGroup();
let layerGroupMobiliteReduite = L.layerGroup();
let layerGroupParkings = L.layerGroup();

let overlayMaps = {
    "Parkings" : layerGroupParkings,
    "Horodateur": layerGroupHorodateur,
    "Places à mobilité réduite": layerGroupMobiliteReduite
};

L.control.layers(null, overlayMaps).addTo(mymap);