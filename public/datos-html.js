// Realizar la solicitud fetch a la API de empleados
fetch('/empleados')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    renderEmployeeTable(data); // Llamar a la función para renderizar la tabla
  })
  .catch(error => {
    console.error('Error en la solicitud:', error);
    showError('No se pudo cargar la lista de empleados. Por favor, intenta más tarde.');
  });

// Función para renderizar la tabla de empleados
function renderEmployeeTable(empleados) {
  const empleadosContainer = document.getElementById('empleados-lista'); // Contenedor para la tabla
  empleadosContainer.innerHTML = ''; // Limpiar contenido previo si lo hubiera

  // Crear la tabla y sus secciones
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  // Crear la fila de encabezados
  const headerRow = document.createElement('tr');
  const headers = ['ID', 'Nombre', 'Edad', 'Salario', 'Departamento'];

  headers.forEach(headerText => {
    const th = document.createElement('th');
    th.textContent = headerText;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);

  // Crear las filas de los empleados
  empleados.forEach(empleado => {
    const row = document.createElement('tr');

    // Crear celdas con los datos del empleado
    const idCell = createCell(empleado.id_empleado);
    const nombreCell = createCell(`${empleado.nombre} ${empleado.apellido}`);
    const edadCell = createCell(empleado.edad);
    const salarioCell = createCell(`${empleado.salario} €`);
    const departamentoCell = createCell(empleado.id_departamento);

    // Agregar las celdas a la fila
    row.appendChild(idCell);
    row.appendChild(nombreCell);
    row.appendChild(edadCell);
    row.appendChild(salarioCell);
    row.appendChild(departamentoCell);

    // Agregar la fila al cuerpo de la tabla
    tbody.appendChild(row);
  });

  // Ensamblar la tabla
  table.appendChild(thead);
  table.appendChild(tbody);

  // Agregar la tabla al contenedor
  empleadosContainer.appendChild(table);
}

// Función para crear una celda de tabla con datos
function createCell(value) {
  const td = document.createElement('td');
  td.textContent = value;
  return td;
}

// Función para mostrar un mensaje de error al usuario
function showError(message) {
  const empleadosContainer = document.getElementById('empleados-lista');
  empleadosContainer.innerHTML = `<p class="error">${message}</p>`;
}

