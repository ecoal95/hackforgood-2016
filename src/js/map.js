/*
 * Run4Rights
 * Copyright (C) 2016
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */
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
    SYRIA: [
      {lat: 33.456346, lng: 36.331787}, // Damascus
      {lat: 31.954701, lng: 35.943146}, // Jordan
      {lat: 30.04227, lng: 31.231384}, // Egypt
      {lat: 26.99639, lng:14.449768}, // Libya
      {lat: 27.962182, lng: -0.189514}, // Algeria
      {lat: 35.741459, lng: -5.822754}, // Morocco
      {lat: 40.400355, lng: -3.694153} // Madrid
    ] // TODO
  };

  function routeMap(element, distance, route) {
    var map = new google.maps.Map(element, {
      zoom: 5,
      center: utils.average(route[0], route[route.length - 1]),
      // mapTypeId: google.maps.MapTypeId.TERRAIN,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
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
      strokeColor: '#22e07e',
      strokeOpacity: 1.0,
      strokeWeight: 9
    })).setMap(map);

    if (second_line_points.length) {
      (new google.maps.Polyline({
        path: second_line_points,
        geodesic: true,
        strokeColor: '#333333',
        strokeOpacity: 0.5,
        strokeWeight: 9
      })).setMap(map);
    }
  }

  window.routeMap = routeMap;
}());
