function initialize() {
    var center = { lat: 50.0483796, lng: 19.9615196};
    var mapOptions = {
        center: center,
        zoom: 16,
        mapTypeId: 'Custom',
        draggable: false
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
    var subtle = [{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#d3d3d3"}]},{"featureType":"transit","stylers":[{"color":"#808080"},{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#b3b3b3"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"weight":1.8}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"color":"#d7d7d7"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ebebeb"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"color":"#a7a7a7"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#efefef"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#696969"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"color":"#737373"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#d6d6d6"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#dadada"}]}];
    var style = [{"stylers":[{"hue":"#ff1a00"},{"invert_lightness":false},{"saturation":-100},{"lightness":33},{"gamma":0.5}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#2D333C"}]}];
    var styledMapOptions = {
        name: 'Custom Style'
    };
    var customMapType = new google.maps.StyledMapType(subtle, styledMapOptions);
    infowindow.open(map,marker);
    map.mapTypes.set('Custom', customMapType);
}
google.maps.event.addDomListener(window, 'load', initialize);