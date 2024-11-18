const login = (req, res) => {
  const { email, password } = req.body;

  // Validación de usuario (puedes cambiar esto para que consulte una base de datos)
  const validUser = {
    email: "diego@gmail.com",
    password: "Diego123", // Contraseña en texto plano por ahora
  };

  // Verificar si las credenciales coinciden
  if (email === validUser.email && password === validUser.password) {
    return res.status(200).json({ message: "Autenticación exitosa" });
  }

  return res.status(400).json({ message: "Credenciales incorrectas" });
};

module.exports = { login };
