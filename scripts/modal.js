// Obtener los elementos
const addButton = document.querySelector(".level-right .button");
const addModal = document.getElementById("addModal");
const closeButton = document.getElementById("closeButton");
const cancelButton = document.getElementById("cancelButton");

// Mostrar el modal cuando se hace clic en Añadir
addButton.addEventListener("click", () => {
  addModal.classList.add("is-active");
});

// Cerrar el modal cuando se hace clic en el botón de cierre o cancelar
closeButton.addEventListener("click", () => {
  addModal.classList.remove("is-active");
});
cancelButton.addEventListener("click", () => {
  addModal.classList.remove("is-active");
});

document.addEventListener("DOMContentLoaded", () => {
  // Funciones para abrir y cerrar un modal
  function openModal($el) {
    $el.classList.add("is-active");
  }

  function closeModal($el) {
    $el.classList.remove("is-active");
  }

  function closeAllModals() {
    (document.querySelectorAll(".modal") || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Agregar un evento de clic en los botones para abrir un modal específico
  (document.querySelectorAll(".js-modal-trigger") || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener("click", () => {
      openModal($target);
    });
  });

  // Agregar un evento de clic en varios elementos secundarios para cerrar el modal padre
  (
    document.querySelectorAll(
      ".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button"
    ) || []
  ).forEach(($close) => {
    const $target = $close.closest(".modal");

    $close.addEventListener("click", () => {
      closeModal($target);
    });
  });

  // Agregar un evento de teclado para cerrar todos los modales
  document.addEventListener("keydown", (event) => {
    if (event.code === "Escape") {
      closeAllModals();
    }
  });
});
