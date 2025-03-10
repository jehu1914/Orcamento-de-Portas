var tabla = document.getElementById("tabla");
var botonAdicionar = document.getElementById("boton-adicionar");
var botonEliminar = document.getElementById("boton-eliminar");
var contadorPuertas = document.getElementById("contador-puertas");

function actualizarContador() {
  var filas = tabla.getElementsByTagName("tr").length - 2; // Restamos 1 para excluir la fila de encabezado
  contadorPuertas.textContent = filas +  " puertas";
}

botonAdicionar.addEventListener("click", function() {
  var tipo = document.getElementById("tipo1").value;
  var ancho = document.getElementById("ancho1").value;
  var alto = document.getElementById("alto1").value;
  var guarnicao = document.getElementById("guarnicao1").value;
  var lado = document.getElementById("lado1").value;
  var visor = document.getElementById("visor1").value;

  // Validación de campos
  if (!tipo || !ancho || !alto || !guarnicao || !lado || !visor) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  var nuevaFila = `<tr>
    <td>${tipo}</td>
    <td>${ancho}</td>
    <td>${alto}</td>
    <td>${guarnicao}</td>
    <td>${lado}</td>
    <td>${visor}</td>
  </tr>`;

  tabla.innerHTML += nuevaFila;

  // Limpiar campos después de añadir
  document.getElementById("tipo1").value = "Giro Simples";
  document.getElementById("ancho1").value = "";
  document.getElementById("alto1").value = "219.5";
  document.getElementById("guarnicao1").value = "";
  document.getElementById("lado1").value = "Esquerdo";
  document.getElementById("visor1").value = "Não";

  // Actualizar el contador de puertas
  actualizarContador();
});

botonEliminar.addEventListener("click", function() {
  var filas = tabla.getElementsByTagName("tr");
  if (filas.length > 1) {
    if (confirm("Tem certeza que deseja eliminar a última fila?")) {
      tabla.deleteRow(filas.length - 1);
      // Actualizar el contador de puertas
      actualizarContador();
    }
  }
});

// Código para manejar la acción de guardar en Excel
document.getElementById('boton-guardar').addEventListener('click', function() {
  var wb = XLSX.utils.book_new();
  var trs = document.querySelectorAll('#tabla tr');
  var data = [];

  // Convertir las filas de la tabla en un array de arrays
  trs.forEach(function(tr) {
    var row = [];
    tr.querySelectorAll('th, td').forEach(function(cell) {
      row.push(cell.innerText);
    });
    data.push(row);
  });

  // Ordenar las filas según los parámetros especificados
  if (data.length > 1) {
    var encabezado = data[0]; // Guardar el encabezado
    var filasOrdenadas = data.slice(1).sort(function(a, b) {
      // Ordenar por Tipo de porta, Largura (cm) y Lado
      if (a[0] === b[0]) {
        if (a[1] === b[1]) {
          return a[4].localeCompare(b[4]); // Ordenar por Lado
        }
        return a[1] - b[1]; // Ordenar por Largura (cm)
      }
      return a[0].localeCompare(b[0]); // Ordenar por Tipo de porta
    });
    data = [encabezado].concat(filasOrdenadas); // Concatenar el encabezado con las filas ordenadas
  }

  var ws = XLSX.utils.aoa_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, ws, "Dados da Tabela");
  XLSX.writeFile(wb, "Orçamento.xlsx");
});

// Inicializar el contador de puertas
actualizarContador();