import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Maestros
const usuarioSchemaMaestros = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    matricula: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    token: {
      type: String,
    },
    materia: {
      type: String,
      default: "",
    },
    horasPermitidasPresencial: {
      type: [String],
      default: ["", "", "", "", "", "", "", "", "", "", "", ""],
    },
    horasPermitidasLinea: {
      type: [String],
      default: ["", "", "", "", "", "", "", "", "", "", "", ""],
    },
  },
  {
    timestamps: true,
  }
);
usuarioSchemaMaestros.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

usuarioSchemaMaestros.methods.comprobarPassword = async function (
  passwordFormulario
) {
  return await bcrypt.compare(passwordFormulario, this.password);
};

const UsuarioMaestros = mongoose.model("Maestro", usuarioSchemaMaestros);

export default UsuarioMaestros;
