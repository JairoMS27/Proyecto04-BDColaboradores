document.getElementById("toggle-map").addEventListener("click", function () {
  var mapColumn = document.getElementById("map-column");
  if (mapColumn.classList.contains("is-hidden-mobile")) {
    mapColumn.classList.remove("is-hidden-mobile");
  } else {
    mapColumn.classList.add("is-hidden-mobile");
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
