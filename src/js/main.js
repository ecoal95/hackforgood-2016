(function() {
  var form = document.getElementById('main-form'),
      number_input = document.getElementById('number'),
      multiplicator_input = document.getElementById('multiplicator'),
      result_bar = document.querySelector('.progress-bar');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var number = parseInt(number_input.value, 10);
    var multiplicator = parseFloat(multiplicator_input.options[multiplicator_input.selectedIndex].value);

    var kilometers = number * multiplicator;

    if (kilometers < 0)
      return;

    var route = window.ROUTES.SYRIA;
    var total = utils.routeDistance(route);

    var percentage = utils.clamp(kilometers / total * 100, 0, 100);

    result_bar.style.width = percentage + "%";
    result_bar.innerHTML = percentage.toFixed(2) + "%";

    window.routeMap(document.getElementById('map'), kilometers, route);
  }, false);

}());
