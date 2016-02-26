(function() {
  var form = document.getElementById('main-form'),
      input = form.querySelector('input');

  console.log("form: " + form);

  form.addEventListener('submit', function(e) {
    var kilometers = parseInt(input.value, 10);

    console.log("KM: " + kilometers);

    e.preventDefault();
  }, false);
}());
