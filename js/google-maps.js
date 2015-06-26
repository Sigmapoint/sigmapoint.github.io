function initialize() {
    var center = { lat: 50.0483796, lng: 19.9615196};
    var mapOptions = {
        center: center,
        zoom: 16,
        mapTypeId: 'Custom',
        draggable: false,
        scrollwheel: false
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
    var image = '../images/map-marker.png';
    var marker = new google.maps.Marker({
        position: center,
        map: map,
        title: 'Sigmapoint',
        icon: image
    });
    var infowindow = new google.maps.InfoWindow({
        content: '<h2>Sigmapoint</h2>\n' +
        '<h4>mobile development<h4>\n' +
        'ul. Ślusarska 9'
    });
    var subtle = [{"featureType":"all","elementType":"all","stylers":[{"saturation":-100},{"gamma":0.5}]}];
    var styledMapOptions = {
        name: 'Custom Style'
    };
    var customMapType = new google.maps.StyledMapType(subtle, styledMapOptions);
    infowindow.open(map,marker);
    map.mapTypes.set('Custom', customMapType);
}
google.maps.event.addDomListener(window, 'load', initialize);