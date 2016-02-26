(function() {
  // Fuente para crear rutas:
  // http://itouchmap.com/latlong.html
  window.ROUTES = {
    TEST: [
      {lat: 40.437401, lng: -3.724365}, // Primer punto madrid
      {lat: 48.862667, lng: 2.362061}, // Segundo punto París
      {lat: 52.500953, lng: 13.40332}, // Tercer punto Berlín
      {lat: 55.799531, lng: 37.63916}, // Cuarto punto Moscú
      {lat: 40.592543, lng: -74.003906} // Quinto punto Nueva York
    ],
    SYRIA: [] // TODO
  };

  function routeMap(element, distance, route) {
    console.log("Before routeMap loop");
    var map = new google.maps.Map(element, {
      zoom: 3,
      center: {lat: 0, lng: -180},
      mapTypeId: google.maps.MapTypeId.TERRAIN,
      disableDefaultUI: true
    });

    var current_distance = 0;
    var first_line_points = [];
    var second_line_points = [];
    var current_line = first_line_points;
    var lines_switched = false;

    for (var i = 1; i < route.length; ++i) {
      var this_step_distance = utils.distance(route[i - 1], route[i]);
      current_line.push(route[i - 1]);
      if (!lines_switched && distance <  current_distance + this_step_distance) {
        reached_point = utils.average(route[i - 1],
                                      route[i],
                                      distance - current_distance);
        first_line_points.push(reached_point);
        second_line_points.push(reached_point);
        current_line = second_line_points;
        lines_switched = true;
      }
      current_distance += this_step_distance;
    }
    current_line.push(route[route.length - 1]);

    (new google.maps.Polyline({
      path: first_line_points,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    })).setMap(map);

    if (second_line_points.length) {
      (new google.maps.Polyline({
        path: second_line_points,
        geodesic: true,
        strokeColor: '#333333',
        strokeOpacity: 1.0,
        strokeWeight: 2
      })).setMap(map);
    }
  }

  window.routeMap = routeMap;
}());
