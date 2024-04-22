import mongoose from "mongoose";

const maestroAsistenciaSchema = mongoose.Schema(
  {
    matricula: {
      type: String,
      trim: true,
      required: true,
    },
    nombre: {
      type: String,
      trim: true,
    },
    fecha: {
      type: String,
      default: "",
    },
    materia: {
      type: String,
    },
    mes: {
      type: String,
      default: "",
    },
    dia: {
      type: String,
      default: "",
    },
    horaUno8_00am: {
      type: String,
      default: "",
    },
    horaDos8_50: {
      type: String,
      default: "",
    },
    horaUno8_50: {
      type: String,
      default: "",
    },
    horaDos9_40: {
      type: String,
      default: "",
    },
    horaUno9_40: {
      type: String,
      default: "",
    },
    horaDos10_30: {
      type: String,
      default: "",
    },
    horaUno11_00: {
      type: String,
      default: "",
    },
    horaDos11_50: {
      type: String,
      default: "",
    },
    horaUno11_50: {
      type: String,
      default: "",
    },
    horaDos12_40: {
      type: String,
      default: "",
    },
    horaUno12_40: {
      type: String,
      default: "",
    },
    horaDos13_30: {
      type: String,
      default: "",
    },
    horaUno6_00: {
      type: String,
      default: "",
    },
    horaDos6_40: {
      type: String,
      default: "",
    },
    horaUno6_40: {
      type: String,
      default: "",
    },
    horaDos7_20: {
      type: String,
      default: "",
    },
    horaUno7_20: {
      type: String,
      default: "",
    },
    horaDos8_00: {
      type: String,
      default: "",
    },
    horaUno8_00pm: {
      type: String,
      default: "",
    },
    horaDos8_40: {
      type: String,
      default: "",
    },
    horaUno8_40: {
      type: String,
      default: "",
    },
    horaDos9_20: {
      type: String,
      default: "",
    },
    horaUno9_20: {
      type: String,
      default: "",
    },
    horaDos10_00: {
      type: String,
      default: "",
    },
    tipoHora: {
      type: String,
      default: "",
    },
    entrada: {
      type: String,
      default: "",
    },
    tipoAsistencia: {
      type: String,
      enum: ["presencial", "enLinea"],
      required: true,
    },
    creador: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Maestro",
    },
  },
  {
    timestamps: true,
  }
);

const MaestroAsistencia = mongoose.model(
  "MaestroAsistencia",
  maestroAsistenciaSchema
);

export default MaestroAsistencia;
