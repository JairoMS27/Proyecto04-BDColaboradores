// Cuando se envía el formulario
document.getElementById("addForm").addEventListener("submit", function (event) {
  event.preventDefault();

  // Recoger los datos del formulario
  var nombre = document.querySelector("#nombre").value;
  var telefono = document.querySelector("#telefono").value;
  var email = document.querySelector("#email").value;
  var fechaIncorporacion = document.querySelector("#fechaIncorporacion").value;
  var tipo = document.querySelector("#tipo").value;

  // Recuperar el contador
  var id = localStorage.getItem("contador");

  // Si el contador no existe, inicializarlo a 1
  if (!id) {
    id = 1;
  }

  // Crear un objeto con los datos
  var colaborador = {
    id: id,
    nombre: nombre,
    telefono: telefono,
    email: email,
    fechaIncorporacion: fechaIncorporacion,
    tipo: tipo,
  };

  // Incrementar el contador
  id++;

  // Almacenar el contador actualizado
  localStorage.setItem("contador", id);

  // Recuperar el array de colaboradores
  var colaboradores = JSON.parse(localStorage.getItem("colaboradores"));

  // Si el array no existe, inicializarlo
  if (!colaboradores) {
    colaboradores = [];
  }

  // Añadir el nuevo colaborador al array
  colaboradores.push(colaborador);

  // Convertir el array en una cadena JSON
  var colaboradoresJSON = JSON.stringify(colaboradores);

  // Almacenar la cadena JSON
  localStorage.setItem("colaboradores", colaboradoresJSON);

  // Llamar a la función que recarga la tabla
  recargarTabla();

  // Limpiar los campos del formulario
  document.querySelector("#nombre").value = "";
  document.querySelector("#telefono").value = "";
  document.querySelector("#email").value = "";
  document.querySelector("#fechaIncorporacion").value = "";
  document.querySelector("#tipo").value = "";
});

var currentPage = 1;
var rowsPerPage = 10;

function recargarTabla() {
  // Recuperar los colaboradores
  var colaboradores = JSON.parse(localStorage.getItem("colaboradores"));

  // Si el array no existe, inicializarlo
  if (!colaboradores) {
    colaboradores = [];
  }

  // Seleccionar el cuerpo de la tabla
  var tbody = document.querySelector("table tbody");

  // Limpiar la tabla
  tbody.innerHTML = "";

  var start = (currentPage - 1) * rowsPerPage;
  var end = start + rowsPerPage;

  // Para cada colaborador en el array de colaboradores
  for (var i = start; i < end; i++) {
    if (i < colaboradores.length) {
      // Añadir una nueva fila a la tabla
      var tr = document.createElement("tr");
      tr.innerHTML =
        "<td>" +
        colaboradores[i].id +
        "</td>" +
        "<td>" +
        colaboradores[i].nombre +
        "</td>" +
        "<td>" +
        colaboradores[i].telefono +
        "</td>" +
        "<td>" +
        colaboradores[i].email +
        "</td>" +
        "<td>" +
        colaboradores[i].fechaIncorporacion +
        "</td>" +
        "<td>" +
        colaboradores[i].tipo +
        "</td>" +
        '<td class="actions">' +
        '<i class="fa-solid fa-user-pen icons"></i>' +
        '<i class="fa-solid fa-user-xmark icons"></i>' +
        "</td>";
      tbody.appendChild(tr);
    }
  }

  var paginationList = document.querySelector(".pagination-list");
  paginationList.innerHTML = "";

  for (var i = 1; i <= Math.ceil(colaboradores.length / rowsPerPage); i++) {
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.className = "pagination-link";
    a.textContent = i;
    a.addEventListener("click", function () {
      currentPage = parseInt(this.textContent);
      recargarTabla();
    });
    li.appendChild(a);
    paginationList.appendChild(li);
  }

  // Selecciona todos los botones de eliminar
  var deleteButtons = document.querySelectorAll(".fa-user-xmark");

  // Para cada botón de eliminar
  deleteButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      // Encuentra la fila de la tabla que contiene este botón
      var row = button.parentElement.parentElement;

      // Encuentra el ID del colaborador en esta fila
      var id = row.querySelector("td:first-child").textContent;

      // Elimina la fila de la tabla
      row.remove();

      // Elimina el colaborador correspondiente del array de colaboradores
      colaboradores = colaboradores.filter(function (colaborador) {
        return colaborador.id !== id;
      });

      // Guarda el array de colaboradores modificado
      localStorage.setItem("colaboradores", JSON.stringify(colaboradores));

      // Actualiza la tabla
      recargarTabla();
    });
  });

  // Selecciona todos los botones de editar
  var editButtons = document.querySelectorAll(".fa-user-pen");

  // Obtiene el modal
  var modal = document.querySelector("#editModal");

  // Obtiene el botón de cerrar
  var closeButton = document.querySelector(".modal .delete");

  var id;

  editButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      // Encuentra la fila de la tabla que contiene este botón
      var row = button.parentElement.parentElement;

      // Encuentra el ID del colaborador en esta fila
      id = row.querySelector("td:first-child").textContent;

      // Encuentra el colaborador correspondiente en el array de colaboradores
      var colaborador = colaboradores.find(function (colaborador) {
        return colaborador.id === id;
      });

      // Rellena el formulario de edición con los detalles del colaborador
      document.querySelector("#editNombre").value = colaborador.nombre;
      document.querySelector("#editTelefono").value = colaborador.telefono;
      document.querySelector("#editEmail").value = colaborador.email;
      document.querySelector("#editFechaIncorporacion").value =
        colaborador.fechaIncorporacion;

      // Establece la opción seleccionada en el elemento select para que coincida con el tipo del colaborador
      document.querySelector("#editTipo").value = colaborador.tipo;

      // Muestra el modal
      modal.classList.add("is-active");
    });
  });

  // Cuando se hace clic en el botón de cerrar, oculta el modal
  closeButton.addEventListener("click", function () {
    modal.classList.remove("is-active");
  });

  // Cuando se envía el formulario de edición
  document
    .getElementById("editForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      // Recoge los datos del formulario de edición
      var nombre = document.querySelector("#editNombre").value;
      var telefono = document.querySelector("#editTelefono").value;
      var email = document.querySelector("#editEmail").value;
      var fechaIncorporacion = document.querySelector(
        "#editFechaIncorporacion"
      ).value;
      var tipo = document.querySelector("#editTipo").value;

      // Encuentra el colaborador correspondiente en el array de colaboradores
      var colaborador = colaboradores.find(function (colaborador) {
        return colaborador.id === id;
      });

      // Actualiza los detalles del colaborador
      colaborador.nombre = nombre;
      colaborador.telefono = telefono;
      colaborador.email = email;
      colaborador.fechaIncorporacion = fechaIncorporacion;
      colaborador.tipo = tipo;

      // Guarda el array de colaboradores modificado
      localStorage.setItem("colaboradores", JSON.stringify(colaboradores));

      // Actualiza la tabla
      recargarTabla();

      // Oculta el modal
      modal.classList.remove("is-active");
    });
}

window.onload = function () {
  recargarTabla();
};

document.addEventListener("DOMContentLoaded", (event) => {
  document
    .getElementById("searchButton")
    .addEventListener("click", function () {
      var input = document.getElementById("searchInput").value.toLowerCase();

      // Recuperar los colaboradores
      var colaboradores = JSON.parse(localStorage.getItem("colaboradores"));

      // Filtrar los colaboradores
      var colaboradoresFiltrados = colaboradores.filter(function (colaborador) {
        return colaborador.nombre.toLowerCase().includes(input);
      });

      // Resaltar las filas que coinciden
      var rows = document
        .querySelector("table tbody")
        .getElementsByTagName("tr");
      for (var i = 0; i < rows.length; i++) {
        var nameCell = rows[i].getElementsByTagName("td")[1]; // Asume que el nombre está en la segunda celda
        if (nameCell) {
          var name = nameCell.textContent || nameCell.innerText;
          if (
            colaboradoresFiltrados.find(function (c) {
              return c.nombre.toLowerCase() === name.toLowerCase();
            })
          ) {
            rows[i].style.backgroundColor = "yellow"; // Cambia esto al color que prefieras
          } else {
            rows[i].style.backgroundColor = ""; // Restablece el color de fondo
          }
        }
      }
    });
});
