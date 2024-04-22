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
      horaUno8_00am: "horaUno8_00am",
      horaDos8_50: "horaDos8_50",
      horaUno8_50: "horaUno8_50",
      horaDos9_40: "horaDos9_40",
      horaUno9_40: "horaUno9_40",
      horaDos10_30: "horaDos10_30",
      horaUno11_00: "horaUno11_00",
      horaDos11_50: "horaDos11_50",
      horaUno11_50: "horaUno11_50",
      horaDos12_40: "horaDos12_40",
      horaUno12_40: "horaUno12_40",
      horaDos13_30: "horaDos13_30",

      horaUno6_00: "horaUno6_00",
      horaDos6_40: "horaDos6_40",
      horaUno6_40: "horaUno6_40",
      horaDos7_20: "horaDos7_20",
      horaUno7_20: "horaUno7_20",
      horaDos8_00: "horaDos8_00",
      horaUno8_00pm: "horaUno8_00pm",
      horaDos8_40: "horaDos8_40",
      horaUno8_40: "horaUno8_40",
      horaDos9_20: "horaDos9_20",
      horaUno9_20: "horaUno9_20",
      horaDos10_00: "horaDos10_00",
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
      horaUno8_00am: tipoHora === "horaUno8_00am" ? horaAMPM : "",
      horaDos8_50: tipoHora === "horaDos8_50" ? horaAMPM : "",
      horaUno8_50: tipoHora === "horaUno8_50" ? horaAMPM : "",
      horaDos9_40: tipoHora === "horaDos9_40" ? horaAMPM : "",
      horaUno9_40: tipoHora === "horaUno9_40" ? horaAMPM : "",
      horaDos10_30: tipoHora === "horaDos10_30" ? horaAMPM : "",
      horaUno11_00: tipoHora === "horaUno11_00" ? horaAMPM : "",
      horaDos11_50: tipoHora === "horaDos11_50" ? horaAMPM : "",
      horaUno11_50: tipoHora === "horaUno11_50" ? horaAMPM : "",
      horaDos12_40: tipoHora === "horaDos12_40" ? horaAMPM : "",
      horaUno12_40: tipoHora === "horaUno12_40" ? horaAMPM : "",
      horaDos13_30: tipoHora === "horaDos13_30" ? horaAMPM : "",
      horaUno6_00: tipoHora === "horaUno6_00" ? horaAMPM : "",
      horaDos6_40: tipoHora === "horaDos6_40" ? horaAMPM : "",
      horaUno6_40: tipoHora === "horaUno6_40" ? horaAMPM : "",
      horaDos7_20: tipoHora === "horaDos7_20" ? horaAMPM : "",
      horaUno7_20: tipoHora === "horaUno7_20" ? horaAMPM : "",
      horaDos8_00: tipoHora === "horaDos8_00" ? horaAMPM : "",
      horaUno8_00pm: tipoHora === "horaUno8_00pm" ? horaAMPM : "",
      horaDos8_40: tipoHora === "horaDos8_40" ? horaAMPM : "",
      horaUno8_40: tipoHora === "horaUno8_40" ? horaAMPM : "",
      horaDos9_20: tipoHora === "horaDos9_20" ? horaAMPM : "",
      horaUno9_20: tipoHora === "horaUno9_20" ? horaAMPM : "",
      horaDos10_00: tipoHora === "horaDos10_00" ? horaAMPM : "",
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
