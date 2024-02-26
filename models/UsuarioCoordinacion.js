import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Maestros
const usuarioSchemaCoordinacion = mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);
usuarioSchemaCoordinacion.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

usuarioSchemaCoordinacion.methods.comprobarPassword = async function (
  passwordFormulario
) {
  return await bcrypt.compare(passwordFormulario, this.password);
};

const UsuarioCoordinacion = mongoose.model(
  "Coordinadores",
  usuarioSchemaCoordinacion
);

export default UsuarioCoordinacion;
