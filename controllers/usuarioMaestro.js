import UsuarioMaestros from "../models/UsuarioMaestro.js";
import generarId from "../helpers/generarID.js";
import generarJWT from "../helpers/generarJWT.js";

// Crear nuevo usuario
const registrarMaestro = async (req, res) => {
  // Evitar registros duplicados
  const { matricula } = req.body;
  const existeUsuario = await UsuarioMaestros.findOne({ matricula });

  if (existeUsuario) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const usuario = new UsuarioMaestros(req.body);
    usuario.token = generarId();
    await usuario.save();

    res.json({ msg: "Usuario almacenado correctamente" });
  } catch (error) {
    console.log(`error: ${error.message}`);
  }
};

const autenticarMaestro = async (req, res) => {
  const { matricula, password } = req.body;

  // Comprobar si el usuario existe
  const usuario = await UsuarioMaestros.findOne({ matricula });
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
      materia: usuario.materia,
      token: generarJWT(usuario._id),
      horasPermitidasPresencial: usuario.horasPermitidasPresencial,
      horasPermitidasLinea: usuario.horasPermitidasLinea,
    });
  } else {
    const error = new Error("El password es incorrecto");
    return res.status(403).json({ msg: error.message });
  }
};

const perfilMaestro = async (req, res) => {
  const { usuario } = req;

  res.json(usuario);
};

export { registrarMaestro, autenticarMaestro, perfilMaestro };
