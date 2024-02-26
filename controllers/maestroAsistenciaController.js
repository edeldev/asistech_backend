import MaestroAsistencia from "../models/MaestroAsistencia.js";
import UsuarioMaestros from "../models/UsuarioMaestro.js";
import UsuarioCoordinacion from "../models/UsuarioCoordinacion.js";
import {
  obtenerFechaFormateada,
  obtenerNombreMes,
  obtenerNombreDia,
  obtenerFechaNumero,
} from "../helpers/fecha.js";

const obtenerAsistencias = async (req, res) => {
  const asistencias = await MaestroAsistencia.find()
    .where("creador")
    .equals(req.usuario);

  res.json(asistencias);
};

const nuevaAsistencia = async (req, res) => {
  try {
    const maestro = await UsuarioMaestros.findOne({
      matricula: req.body.matricula,
    });

    const { tipoHora, entrada, tipoAsistencia } = req.body;

    if (!maestro) {
      const error = new Error("Maestro no encontrado");
      return res.status(404).json({ msg: error.message });
    }

    const fechaFormateadaObj = obtenerFechaFormateada();
    const nombreMes = obtenerNombreMes();
    const fechaNumero = obtenerFechaNumero();
    const nombreDia = obtenerNombreDia();

    const horaAMPM =
      fechaFormateadaObj.hour +
      ":" +
      fechaFormateadaObj.minute +
      " " +
      fechaFormateadaObj.dayPeriod;

    const horasMap = {
      horaUno: "horaUno",
      horaDos: "horaDos",
      horaTres: "horaTres",
      horaCuatro: "horaCuatro",
      horaCinco: "horaCinco",
      horaSeis: "horaSeis",
      horaSiete: "horaSiete",
      horaOcho: "horaOcho",
      horaNueve: "horaNueve",
      horaDiez: "horaDiez",
      horaOnce: "horaOnce",
      horaDoce: "horaDoce",
    };

    if (horasMap[tipoHora]) {
      maestro[horasMap[tipoHora]] = horaAMPM;
    }

    maestro.mes = nombreMes;
    maestro.fecha = fechaNumero;
    maestro.dia = nombreDia;
    maestro.tipoHora = tipoHora;
    maestro.entrada = entrada;
    maestro.tipoAsistencia = tipoAsistencia;
    maestro.creador = req.usuario;

    // Verificar si ya existe una asistencia para la misma fecha y hora
    const asistenciaExistente = await MaestroAsistencia.findOne({
      matricula: maestro.matricula,
      fecha: fechaNumero,
      tipoHora: tipoHora,
      tipoAsistencia: tipoAsistencia,
    });

    if (asistenciaExistente) {
      const error = new Error(
        "Ya existe un registro de asistencia para esta fecha y hora"
      );
      return res.status(400).json({ msg: error.message });
    }

    const horasPermitidas =
      tipoAsistencia === "presencial"
        ? maestro.horasPermitidasPresencial
        : maestro.horasPermitidasLinea;

    // Verificar si la hora proporcionada está permitida
    if (!horasPermitidas.includes(tipoHora)) {
      const error = new Error(
        "Esta hora no está permitida para la asistencia " + tipoAsistencia
      );
      return res.status(400).json({ msg: error.message });
    }

    // ---------------------------------

    // Crear y guardar la nueva asistencia
    const asistencia = new MaestroAsistencia({
      matricula: maestro.matricula,
      nombre: maestro.nombre,
      materia: maestro.materia,
      mes: fechaFormateadaObj.month,
      fecha: fechaNumero,
      dia: fechaFormateadaObj.weekday,
      horaUno: tipoHora === "horaUno" ? horaAMPM : "",
      horaDos: tipoHora === "horaDos" ? horaAMPM : "",
      horaTres: tipoHora === "horaTres" ? horaAMPM : "",
      horaCuatro: tipoHora === "horaCuatro" ? horaAMPM : "",
      horaCinco: tipoHora === "horaCinco" ? horaAMPM : "",
      horaSeis: tipoHora === "horaSeis" ? horaAMPM : "",
      horaSiete: tipoHora === "horaSiete" ? horaAMPM : "",
      horaOcho: tipoHora === "horaOcho" ? horaAMPM : "",
      horaNueve: tipoHora === "horaNueve" ? horaAMPM : "",
      horaDiez: tipoHora === "horaDiez" ? horaAMPM : "",
      horaOnce: tipoHora === "horaOnce" ? horaAMPM : "",
      horaDoce: tipoHora === "horaDoce" ? horaAMPM : "",
      tipoHora: tipoHora,
      entrada: entrada,
      tipoAsistencia: tipoAsistencia,
      creador: maestro.creador,
    });

    const asistenciaAlmacenada = await asistencia.save();
    res.json(asistenciaAlmacenada);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

const eliminarTodasAsistencias = async (req, res) => {
  const coordinacionId = req.params.coordinadorId;

  try {
    const asistenciasCreador = await MaestroAsistencia.find({
      creador: coordinacionId,
    });

    if (asistenciasCreador.length === 0) {
      return res.status(404).json({
        mensaje: "No se encontraron asistencias para el coordinador.",
      });
    }

    await MaestroAsistencia.deleteMany({ creador: coordinacionId });

    res.json({
      mensaje: "Todas las asistencias han sido eliminadas correctamente.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      mensaje: "Error interno del servidor al eliminar asistencias.",
    });
  }
};

export { obtenerAsistencias, nuevaAsistencia, eliminarTodasAsistencias };
