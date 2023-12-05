// Espera a que el contenido del documento esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  // Obtén todos los elementos con la clase "navbar-burger" y conviértelos en un array
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );

  // Itera sobre cada elemento del array
  $navbarBurgers.forEach((el) => {
    // Agrega un evento de clic a cada elemento
    el.addEventListener("click", () => {
      // Obtiene el valor del atributo "data-target" del elemento actual
      const target = el.dataset.target;
      // Obtiene el elemento con el ID correspondiente al valor del atributo "data-target"
      const $target = document.getElementById(target);

      // Alterna la clase "is-active" en el elemento actual
      el.classList.toggle("is-active");
      // Alterna la clase "is-active" en el elemento objetivo
      $target.classList.toggle("is-active");
    });
  });
});
