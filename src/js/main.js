(function() {
  var form = document.getElementById('main-form'),
      input = form.querySelector('input'),
      result_bar = document.querySelector('.progress-bar');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var kilometers = parseInt(input.value, 10);

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
