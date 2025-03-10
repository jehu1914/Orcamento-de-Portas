var tabla = document.getElementById("tabla");
    var botonAdicionar = document.getElementById("boton-adicionar");
    var botonEliminar = document.getElementById("boton-eliminar");

    botonAdicionar.addEventListener("click", function() {
      var tipo = document.getElementById("tipo1").value;
      var ancho = document.getElementById("ancho1").value;
      var alto = document.getElementById("alto1").value;
      var guarnicao = document.getElementById("guarnicao1").value;
      var lado = document.getElementById("lado1").value;
      var visor = document.getElementById("visor1").value;

      var nuevaFila = `<tr>
        <td>${tipo}</td>
        <td>${ancho}</td>
        <td>${alto}</td>
        <td>${guarnicao}</td>
        <td>${lado}</td>
        <td>${visor}</td>
      </tr>`;

      tabla.innerHTML += nuevaFila;
    });

    botonEliminar.addEventListener("click", function() {
      var filas = tabla.getElementsByTagName("tr");
      if (filas.length > 1) {
        tabla.deleteRow(filas.length - 1);
      }
    });
    
    // Código para manejar la acción de guardar en Excel
    document.getElementById('boton-guardar').addEventListener('click', function() {
      var wb = XLSX.utils.book_new();
      var trs = document.querySelectorAll('#tabla tr');
      var data = [];

      trs.forEach(function(tr) {
        var row = [];
        tr.querySelectorAll('th, td').forEach(function(cell) {
          row.push(cell.innerText);
        });
        data.push(row);
      });

      var ws = XLSX.utils.aoa_to_sheet(data);
      XLSX.utils.book_append_sheet(wb, ws, "Datos de la Tabla");
      XLSX.writeFile(wb, "DatosTabla.xlsx");
    });