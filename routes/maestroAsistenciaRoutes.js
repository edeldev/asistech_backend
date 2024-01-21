import express from 'express'
const router = express.Router()

import { obtenerAsistencias, nuevaAsistencia } from '../controllers/maestroAsistenciaController.js'
import checkAuthMaestro from '../middlewares/checkAuthMaestro.js'

router
    .route('/')
    .get(checkAuthMaestro, obtenerAsistencias)
    .post(checkAuthMaestro, nuevaAsistencia)

export default router