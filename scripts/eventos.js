// Array de imágenes y títulos
var images = [
  { src: "./img/lagoas-belelle.jpg", title: "Recollida de Lixo" },
  { src: "./img/imagen2.jpg", title: "Seminario Educativo" },
  { src: "./img/imagen3.jpg", title: "Curso de Formacion" },
];
// Índice de la imagen actual
var currentImageIndex = 0;

// Función para cambiar la imagen y el título
function changeImage(direction) {
  // Get the image container and title elements
  var imgContainer = document.querySelector(".image-container");
  var title = document.querySelector(".image-container h1");

  // Increment or decrement the current image index
  if (direction === "left") {
    currentImageIndex =
      currentImageIndex > 0 ? currentImageIndex - 1 : images.length - 1;
  } else {
    currentImageIndex =
      currentImageIndex < images.length - 1 ? currentImageIndex + 1 : 0;
  }

  // Change the image source and title
  imgContainer.style.backgroundImage =
    "url(" + images[currentImageIndex].src + ")";
  title.textContent = images[currentImageIndex].title;
}

// Eventos de clic para las flechas
document.querySelector(".fa-arrow-left").addEventListener("click", function () {
  changeImage("left");
});
document
  .querySelector(".fa-arrow-right")
  .addEventListener("click", function () {
    changeImage("right");
  });

// Crear un intervalo para cambiar la imagen y el título cada 5 segundos
setInterval(function () {
  changeImage("right");
}, 5000);
