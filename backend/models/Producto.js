const db = require("../config/db"); 

class Producto {
  // Obtener todos los productos
  static async getAll() {
    try {
      const [rows] = await db.query("SELECT * FROM productos");
      return rows; // Devuelve todos los productos
    } catch (error) {
      console.error("Error al obtener productos:", error.message);
      throw error; // Propaga el error al controlador
    }
  }

  // Obtener un producto por su ID
  static async getProductById(id) {
    try {
      const [rows] = await db.query("SELECT * FROM productos WHERE id = ?", [
        id,
      ]);
      return rows[0]; // Retorna el primer producto que coincide con el ID
    } catch (error) {
      console.error(
        `Error al obtener el producto con ID ${id}:`,
        error.message
      );
      throw error; // Propaga el error al controlador
    }
  }
}

module.exports = Producto;
