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
