import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import maestroAsistenciaRoutes from "./routes/maestroAsistenciaRoutes.js";

const app = express();
app.use(express.json());

dotenv.config();
conectarDB();

// Configurar CORS
const whiteList = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.includes(origin)) {
      // Puede consultar la API
      callback(null, true);
    } else {
      // No esta permitido
      callback(new Error(`Error de CORS, ${origin}`));
    }
  },
};

app.use(cors(corsOptions));

// Routing
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/asistencia", maestroAsistenciaRoutes);

const PORT = process.env.PORT || 4000;

const servidor = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Socket io
import { Server } from "socket.io";

const io = new Server(servidor, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.FRONTEND_URL,
  },
});

io.on("connection", (socket) => {
  console.log("Conectado a socket io");

  // Definir eventos
  socket.on("abrir asistencia", (asistencia) => {
    socket.join(asistencia);
  });

  socket.on("nueva asistencia", (asistenciaMaestro) => {
    socket.emit("asistencia agregada", asistenciaMaestro);
  });
});
