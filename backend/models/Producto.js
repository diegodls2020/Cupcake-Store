const db = require("../config/db");

class Producto {
  // Obtener todos los productos
  static async getAll() {
    try {
      const [rows] = await db.promise().query("SELECT * FROM productos");
      return rows;
    } catch (error) {
      console.error("Error al obtener productos:", error.message);
      throw error;
    }
  }

  // Buscar un producto por ID
  static async findById(id) {
    try {
      const [rows] = await db
        .promise()
        .query("SELECT * FROM productos WHERE id = ?", [id]);
      return rows[0];
    } catch (error) {
      console.error("Error al obtener producto:", error.message);
      throw error;
    }
  }
}

module.exports = Producto;
