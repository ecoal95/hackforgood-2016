(function() {
  var form = document.getElementById('main-form'),
      input = form.querySelector('input'),
      result_bar = document.querySelector('.progress-bar');

  console.log("form: " + form);

  form.addEventListener('submit', function(e) {
    var kilometers = parseInt(input.value, 10);

    console.log("KM: " + kilometers);
    result_bar.style.width = "50%";

    window.routeMap(document.getElementById('map'), kilometers, window.ROUTES.TEST);
    e.preventDefault();
  }, false);

}());
