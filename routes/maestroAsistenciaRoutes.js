import express from "express";
const router = express.Router();

import {
  obtenerAsistencias,
  nuevaAsistencia,
} from "../controllers/maestroAsistenciaController.js";

router.route("/").get(obtenerAsistencias).post(nuevaAsistencia);

export default router;
