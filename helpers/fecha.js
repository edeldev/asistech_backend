const obtenerFechaFormateada = () => {
  const fechaActual = new Date();
  const formatoFecha = new Intl.DateTimeFormat("es-MX", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: "America/Monterrey",
  });

  return formatoFecha.format(fechaActual);
};

const obtenerNombreMes = () => {
  const fechaActual = new Date();
  return new Intl.DateTimeFormat("es", { month: "long" }).format(fechaActual);
};

const obtenerNombreDia = () => {
  const fechaActual = new Date();
  return new Intl.DateTimeFormat("es", { weekday: "long" }).format(fechaActual);
};

const obtenerFechaNumero = () => {
  const fechaActual = new Date();
  const nombreMes = obtenerNombreMes();
  return `${fechaActual
    .getDate()
    .toString()
    .padStart(2, "0")} ${nombreMes} ${fechaActual.getFullYear()}`;
};

export {
  obtenerFechaFormateada,
  obtenerNombreMes,
  obtenerNombreDia,
  obtenerFechaNumero,
};
