const express = require("express");
const { Client, Pool } = require("pg");
require("dotenv").config(); // Carga variables de entorno desde .env
const app = express();
const path = require("path");

// Determinar si estamos en producción o en desarrollo
const isProduction = process.env.NODE_ENV === "production";

// Si estamos en producción, usamos Pool; en desarrollo, usamos Client
const dbClient = isProduction
  ? new Pool({
      connectionString: process.env.POSTGRES_URL, // URL de conexión para producción
      ssl: { rejectUnauthorized: false },
    })
  : new Client({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    });

// Conexión a la base de datos dependiendo del entorno
if (isProduction) {
  dbClient
    .connect()
    .then(() => {
      console.log("Conexión exitosa a PostgreSQL (Pool)");
    })
    .catch((err) => {
      console.error("Error al conectar a PostgreSQL (Pool):", err);
    });
} else {
  dbClient
    .connect()
    .then(() => {
      console.log("Conexión exitosa a PostgreSQL (Client)");
    })
    .catch((err) => {
      console.error("Error al conectar a PostgreSQL (Client):", err);
    });
}

// Configurar Express para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, "public")));

// Ruta principal para cargar el archivo index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/users", async (req, res) => {
  try {
    const result = await dbClient.query("SELECT * FROM empleados");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta dinámica para obtener un empleado por nombre
app.get("/empleado/:nombre", async (req, res) => {
  const { nombre } = req.params; // Extraemos el nombre del parámetro de la URL

  try {
    // Realizamos la consulta a la base de datos
    const result = await dbClient.query(
      "SELECT * FROM empleados WHERE nombre = $1",
      [nombre]
    );

    // Si se encuentra el empleado, enviamos los datos en formato JSON
    if (result.rows.length > 0) {
      res.json(result.rows[0]); // Devuelve el primer resultado
    } else {
      res.status(404).send("Empleado no encontrado");
    }
  } catch (error) {
    console.error("Error al obtener el empleado:", error);
    res.status(500).send("Error en el servidor");
  }
});

// Ruta para obtener los datos de la tabla empleados
app.get("/empleados", async (req, res) => {
  try {
    const result = await dbClient.query("SELECT * FROM empleados;"); // Consulta a la tabla empleados
    res.json(result.rows); // Devuelve los datos en formato JSON
  } catch (err) {
    console.error("Error al consultar la tabla empleados:", err);
    res.status(500).send("Error al obtener los empleados.");
  }
});

// Iniciar el servidor
const port = process.env.PORT || 12314; // Esto permitirá que Vercel use su puerto.
// Si intentas usar vercel dev, elimina esta línea ya que ambos intentarán crear un listenener
app.listen(port, () =>
  console.log("Server ready on port " + `http://localhost:${port}`)
);

module.exports = app;
