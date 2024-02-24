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

//! COORDINACION
router.post("/coordinacion-registrar", registrarCoordinacion);
router.post("/login-coordinacion", autenticarCoordinacion);
router.get("/perfil-coordinacion", checkAuthCoordinacion, perfilCoordinacion);
router.delete("/area-coordinacion/:id", eliminarTodasAsistencias);

//! MAESTROS
router.post("/maestro-registrar", registrarMaestro);
router.post("/login-maestro", autenticarMaestro);
router.get("/perfil-maestro", checkAuthMaestro, perfilMaestro);

export default router;
