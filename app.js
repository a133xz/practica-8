const express = require("express");
const { Client, Pool } = require("pg");
require("dotenv").config(); // Carga variables de entorno desde .env
const app = express();
const path = require("path");

// Define a port
const PORT = 3000;

// Configurar Express para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, "public")));

// Ruta principal para cargar el archivo index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Mock data
const empleados = [
  {
    id_empleado: 1,
    nombre: "Juan",
    apellido: "Pérez",
    edad: 35,
    salario: 25000,
    id_departamento: 101,
  },
  {
    id_empleado: 2,
    nombre: "María",
    apellido: "García",
    edad: 29,
    salario: 30000,
    id_departamento: 102,
  },
  {
    id_empleado: 3,
    nombre: "Luis",
    apellido: "Martínez",
    edad: 42,
    salario: 40000,
    id_departamento: 103,
  },
  {
    id_empleado: 4,
    nombre: "Ana",
    apellido: "López",
    edad: 31,
    salario: 28000,
    id_departamento: 101,
  },
  {
    id_empleado: 5,
    nombre: "Carlos",
    apellido: "Hernández",
    edad: 37,
    salario: 32000,
    id_departamento: 102,
  },
];

// Endpoint to return the list of employees
app.get("/empleados", (req, res) => {
  res.json(empleados);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
