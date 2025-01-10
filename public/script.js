// Si necesitas incluir contenido HTML y asegurar su sanitización:
function sanitizeHTML(content) {
    return DOMPurify.sanitize(content);  // Usar DOMPurify para limpiar el HTML
}

document.addEventListener('DOMContentLoaded', function () {
    const app = document.getElementById('app');
    
    if (app) {
        const parrafo = document.createElement('p');
        
        // Si necesitas permitir HTML, usa sanitizeHTML
        const htmlContent = "<strong>Hola desde JavaScript</strong>";  // Ejemplo con HTML
        parrafo.innerHTML = sanitizeHTML(htmlContent);
        
        app.appendChild(parrafo);
    } else {
        console.error("No se encontró el contenedor con id 'app'.");
    }
});
