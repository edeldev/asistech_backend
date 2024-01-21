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
    horaUno: {
      type: String,
      default: "",
    },
    horaDos: {
      type: String,
      default: "",
    },
    horaTres: {
      type: String,
      default: "",
    },
    horaCuatro: {
      type: String,
      default: "",
    },
    horaCinco: {
      type: String,
      default: "",
    },
    horaSeis: {
      type: String,
      default: "",
    },
    horaSiete: {
      type: String,
      default: "",
    },
    horaOcho: {
      type: String,
      default: "",
    },
    horaNueve: {
      type: String,
      default: "",
    },
    horaDiez: {
      type: String,
      default: "",
    },
    horaOnce: {
      type: String,
      default: "",
    },
    horaDoce: {
      type: String,
      default: "",
    },
    tipoHora: {
      type: String,
      default: "",
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
