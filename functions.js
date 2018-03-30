// Your functions
//
//

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