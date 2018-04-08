// Events functions
//
//

// onCreate : This function is called when page began.
function onCreate(map) {
    // Load location.
    var lat = $.cookie('lat');
    var lng = $.cookie('lng');
    var zoom = $.cookie('zoom');
    
    var latlng = [35.737841, 139.653912];
    
    if (lat != null && lng != null) {
        latlng = [lat, lng];
    }
    
    map = L.map('map', {zoomControl: true}).setView(latlng, zoom != null ? zoom : 13);
    
    var mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    
    L.tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
            attribution: 'Map data &copy; ' + mapLink,
            maxZoom: 18
        }
    ).addTo(map);
        
    var info = L.control();
    
    info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
        this.update();
        return this._div;
    };
    
    // method that we will use to update the control based on feature properties passed
    info.update = function (feature) {
        var popupContents = onUpdateInfo(feature) ;
    
        if (popupContents != null) {
            this._div.innerHTML = popupContents ;
            $(".info").css("display", "inline") ;
        }
    };
    
    info.addTo(map);
    
    $(".info").css("display", "none") ;
    
    var markerIcon = L.icon({
        iconUrl: 'tanuki_icon.png',
        iconSize: [40, 40],
        popupAnchor: [0, -20],
    });
    
    $.getJSON('./data/13120.json', function(data) {
        L.geoJson(data).addTo(map);
    });
    
    $.getJSON('./data/data.geojson', function(data) {
        L.geoJson(data, {
            pointToLayer: function(geoJsonPoint, latlng) {
                return L.marker(latlng, {icon: markerIcon}).addTo(map)
            },
            onEachFeature: function(feature, layer) {
                var popupContents = onCraeteMarkerPopup(feature, layer) ;
    
                   layer.bindPopup(popupContents);
     
                layer.on({
                    mouseover: function(e){  
                        info.update(feature);
                    },
                    mouseout: function(e){
                    
                    },
                    click: function(e){
                    
                    }
                });
            }
        }).addTo(map);
    });
    
    var popup = L.popup();
    
    map.on('click', function(e) {
        $(".info").css("display", "none") ;
    });
    
    map.on('moveend', function(e) {
        saveMap() ;
    }) ;
        
    L.easyButton('fa-home', function(btn, map){
        var latlng = [35.737841, 139.65391];
        map.setView(latlng, 13);
    
        saveMap() ;
    }).addTo(map);
        
    function saveMap() {
        var c = map.getCenter() ;
            var z = map.getZoom() ;
            $.cookie('lat', c.lat, { expires: 7, path: 'https://code4nerima.github.io/tanukimap/' });
            $.cookie('lng', c.lng, { expires: 7, path: 'https://code4nerima.github.io/tanukimap/' });
            $.cookie('zoom', z, { expires: 7, path: 'https://code4nerima.github.io/tanukimap/' });
    }
}

// onCraeteMarkerPopup : This function is called when marker is created by Leaflet.
function onCraeteMarkerPopup(feature, layer) {
    return createContent(feature);
}

// onUpdateInfo : This function is updated info content.
function onUpdateInfo(feature) {
    return createContent(feature);
}

function createContent(feature) {
    var popupContents = '<h4>練馬たぬきマップ</h4>';
 
    if (feature && feature.properties) {     
        if (feature.properties.picture) {
            popupContents += "<image src=\"./images/" + feature.properties.picture + "\" width=\"200\" /><br />" ;					
		}
        
        if (feature.properties.content) {
            popupContents += feature.properties.content ;
        } else {
            popupContents += "-" ;
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
    }

    return popupContents ;
}