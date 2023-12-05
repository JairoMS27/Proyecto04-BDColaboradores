document.getElementById('toggle-map').addEventListener('click', function() {
  var mapa = document.getElementById('mapa');
  if (mapa.style.display === 'none') {
    mapa.style.display = 'block';
  } else {
    mapa.style.display = 'none';
  }
});

document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    // Evitar que el formulario se envíe
    event.preventDefault();

    // Ocultar el formulario
    document.getElementById("contact-form").classList.add("is-hidden");

    // Mostrar el mensaje de éxito
    document.getElementById("success-message").classList.remove("is-hidden");
  });
