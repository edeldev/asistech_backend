import express from "express";
const router = express.Router();

//* COORDINACION
import {
  registrarCoordinacion,
  perfilCoordinacion,
  autenticarCoordinacion,
} from "../controllers/usuarioCoordinacion.js";
import { eliminarTodasAsistencias } from "../controllers/maestroAsistenciaController.js";
import checkAuthCoordinacion from "../middlewares/checkAuthCoordinacion.js";

//*MAESTROS
import {
  registrarMaestro,
  perfilMaestro,
  autenticarMaestro,
} from "../controllers/usuarioMaestro.js";
import checkAuthMaestro from "../middlewares/checkAuthMaestro.js";

//*ALUMNOS
import {
  registrarAlumno,
  perfilAlumno,
  autenticarAlumno,
} from "../controllers/usuarioAlumno.js";
import checkAuthAlumno from "../middlewares/checkAuthAlumno.js";

//! COORDINACION
router.post("/coordinacion-registrar", registrarCoordinacion);
router.post("/login-coordinacion", autenticarCoordinacion);
router.get("/perfil-coordinacion", checkAuthCoordinacion, perfilCoordinacion);
router.delete("/area-coordinacion/:id", eliminarTodasAsistencias);

//! MAESTROS
router.post("/maestro-registrar", registrarMaestro);
router.post("/login-maestro", autenticarMaestro);
router.get("/perfil-maestro", checkAuthMaestro, perfilMaestro);

//! ALUMNOS
router.post("/alumno-registrar", registrarAlumno);
router.post("/login-alumno", autenticarAlumno);
router.get("/perfil-alumno", checkAuthAlumno, perfilAlumno);

export default router;
