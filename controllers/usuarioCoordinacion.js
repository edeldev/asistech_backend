import UsuarioCoordinacion from "../models/UsuarioCoordinacion.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";

// Crear nuevo usuario
const registrarCoordinacion = async (req, res) => {
  // Evitar registros duplicados
  const { matricula } = req.body;
  const existeUsuario = await UsuarioCoordinacion.findOne({ matricula });

  if (existeUsuario) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const usuario = new UsuarioCoordinacion(req.body);
    usuario.token = generarId();
    await usuario.save();

    res.json({ msg: "Usuario almacenado correctamente" });
  } catch (error) {
    console.log(`error: ${error.message}`);
  }
};

const autenticarCoordinacion = async (req, res) => {
  const { matricula, password } = req.body;

  // Comprobar si el usuario existe
  const usuario = await UsuarioCoordinacion.findOne({ matricula });
  if (!usuario) {
    const error = new Error("Usuario no existe");
    return res.status(404).json({ msg: error.message });
  }

  // Comprar password
  if (await usuario.comprobarPassword(password)) {
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      matricula: usuario.matricula,
      token: generarJWT(usuario._id),
    });
  } else {
    const error = new Error("El password es incorrecto");
    return res.status(403).json({ msg: error.message });
  }
};

const perfilCoordinacion = async (req, res) => {
  const { usuario } = req;

  res.json(usuario);
};

export { registrarCoordinacion, autenticarCoordinacion, perfilCoordinacion };
