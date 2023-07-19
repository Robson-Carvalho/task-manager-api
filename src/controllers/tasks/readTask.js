const sql = require("../../database/postgres");

const readTask = async (req, res) => {
  try {
    const id = req.userID;

    if (!id) {
      return res.status(400).json({
        message: "O ID do usuário não foi informado!",
      });
    }

    const result = await sql`SELECT * FROM tasks WHERE id_user = ${id}`;

    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor" });
  }
};

module.exports = readTask;
