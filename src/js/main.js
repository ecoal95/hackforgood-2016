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

  var form = document.getElementById('main-form'),
      number_input = document.getElementById('number'),
      multiplicator_input = document.getElementById('multiplicator'),
      result = document.getElementById('result'),
      result_text = document.getElementById('result-text');
      // result_bar = document.querySelector('.progress-bar');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var number = parseInt(number_input.value, 10);
    var multiplicator = parseFloat(multiplicator_input.options[multiplicator_input.selectedIndex].value);

    var kilometers = number * multiplicator;

    if (kilometers < 0 || isNaN(kilometers)) {
      number_input.className += " invalid";
      return;
    }

    number_input.className = number_input.className
                                         .replace(/\binvalid\b/g, "");

    var route = window.ROUTES.SYRIA;
    var total = utils.routeDistance(route);

    var percentage = utils.clamp(kilometers / total * 100, 0, 100);

    // result_bar.style.width = percentage + "%";

    if (percentage / 100 != 0)
      percentage = percentage.toFixed(2);
    else
      percentage = percentage.toString();
    // result_bar.innerHTML = percentage + "%";

    window.routeMap(document.getElementById('map'), kilometers, route);

    if (percentage == 100) {
      result_text.innerHTML = "Felicidades! Hubieras llegado a Europa!";
    } else {
      result_text.innerHTML = "Hubieras recorrido un <span class=\"percentage\">" + percentage + "%</span> de tu viaje como refugiado";
    }

    result.style.display = "block";

    utils.scrollTo('#result');
  }, false);


  $(".scroll-to").on("click", function(e) {
    e.preventDefault();
    utils.scrollTo(this.hash);
  });
}());
