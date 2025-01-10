fetch('/empleados')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    renderEmployeeList(data);
  })
  .catch(error => {
    console.error('Error en la solicitud:', error);
    showError('No se pudo cargar la lista de empleados. Por favor, intenta nuevamente más tarde.');
  });

// Función para renderizar la lista de empleados
function renderEmployeeList(empleados) {
  const empleadosLista = document.getElementById('empleados-lista');
  empleadosLista.innerHTML = ''; // Limpiar contenido previo si lo hubiera

  empleados.forEach(empleado => {
    const div = document.createElement('div');

    // Crear y agregar elementos seguros
    const p = document.createElement('p');
    p.textContent = `${empleado.id_empleado} -- ${empleado.nombre} -- ${empleado.apellido} -- ${empleado.edad} -- ${empleado.salario} €-- ${empleado.id_departamento}`;
    div.appendChild(p);

    empleadosLista.appendChild(div);
  });
}

// Función para mostrar un mensaje de error al usuario
function showError(message) {
  const empleadosLista = document.getElementById('empleados-lista');
  empleadosLista.innerHTML = ''; // Limpiar contenido previo si lo hubiera
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error';
  errorDiv.textContent = message;
  empleadosLista.appendChild(errorDiv);
}


