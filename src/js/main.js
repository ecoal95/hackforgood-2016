(function() {
  var form = document.getElementById('main-form'),
      input = form.querySelector('input'),
      result_bar = document.querySelector('.progress-bar');

  console.log("form: " + form);

  form.addEventListener('submit', function(e) {
    var kilometers = parseInt(input.value, 10);

    console.log("KM: " + kilometers);
    result_bar.style.width = "50%";
    e.preventDefault();
  }, false);
}());
