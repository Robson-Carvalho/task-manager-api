const sql = require("../../database/postgres");

const readTask = async (req, res) => {
  try {
    const id = req.userID;

    const result = await sql`SELECT * FROM tasks WHERE id_user = ${id}`;

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor" });
  }
};

module.exports = readTask;
