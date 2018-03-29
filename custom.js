// Events functions
//
//

// onInitialLatLng : This function is called when setting initial lat & lng.
function onInitialLatLng() {
    return [35.737841　, 139.653912];
}

// onCreate : This function is called when page began.
function onCreate(map) {
    L.marker([35.737841　, 139.653912]).addTo(map)
    .bindPopup('練馬駅');
}

// onCreateMarkerIcon : This function is called when marker icon is created.
function onCreateMarkerIcon() {
    return L.icon({
        iconUrl: 'tanuki_icon.png',
        iconSize: [40, 40],
        iconAnchor: [0, 0],
        popupAnchor: [20, 0],
        shadowUrl: '',
        shadowSize: [38, 38],
        shadowAnchor: [0, 0]
    });
}

// onMapClick : This function is called when map was clicked.
function onMapClick(e) {
	//popup.setLatLng(e.latlng).setContent("You clicked the map at " + e.latlng.toString()).openOn(map);
}

// onRequireAreaBorder : This function is called when loading area border geoJSON.
function onRequireAreaBorder() {
    return './data/13120.json';
}

// onCraeteMarkerPopup : This function is called when marker is created by Leaflet.
function onCraeteMarkerPopup(feature, layer) {
    return createContent(feature);
}

// onMarkerMouseOver : This function is called marker mouse over. If return false, onUpdateInfo isn't called.
function onMarkerMouseOver(e) {
    return true ;
}

// onMarkerMouseOver : This function is called marker mouse out.
function onMarkerMouseOut(e) {
    
}

// onMarkerMouseOver : This function is called marker mouse click.
function onMarkerClick(e) {
    
}

// onUpdateInfo : This function is updated info content.
function onUpdateInfo(feature) {
    return createContent(feature);
}