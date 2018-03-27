// onInitialLatLng : This function is called when setting initial lat & lng.
function onInitialLatLng() {
    return [35.737841　, 139.653912];
}

// onCreate : This function is called when page began.
function onCreate() {
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

// onRequireAreaBorder : This function is called when loading area border geoJSON.
function onRequireAreaBorder() {
    return './data/13120.json';
}

// onCraeteMarkerPopup : This function is called when marker is created by Leaflet.
function onCraeteMarkerPopup(feature, layer) {
    if (feature.properties) {
        var popupContents ;
        
        if (feature.properties.content && feature.properties.picture) {
            popupContents = "<a href=\"./images/" + feature.properties.picture + "\" target=\"_preview\">" + feature.properties.content + "</a>" ;					
        } else if (feature.properties.content) {
            popupContents = feature.properties.content ;
        } else {
            popupContents = "-" ;
        }
        
        if (feature.properties.type) {
            popupContents += "<br />" + feature.properties.type;
        }
        
        if (feature.properties.size) {
            popupContents += "<br />" + feature.properties.size;
        }
        
        if (feature.properties.memo) {
            popupContents += "<br />" + feature.properties.memo;
        }
        
        layer.bindPopup(popupContents);
    }
}