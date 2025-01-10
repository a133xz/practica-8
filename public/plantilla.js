function loadHTML(file, elementId) {
    fetch(file)
        .then(response => response.text())  // Convertir el archivo a texto
        .then(data => {
            document.getElementById(elementId).innerHTML = data;  // Insertar el contenido en el div correspondiente
        })
        .catch(error => {
            console.log('Error al cargar el archivo: ', error);
        });
}

// Llamadas para cargar los archivos HTML al cargar la página
window.onload = function() {
    loadHTML('head.html', 'head-container');  // Cargar el contenido del head
    loadHTML('footer.html', 'footer-container');  // Cargar el contenido del footer
};