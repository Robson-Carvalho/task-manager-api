const sql = require("../../database/postgres");

const updateTask = async (req, res) => {
  try {
    const { id, title, content, status } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "O ID da tarefa não foi informado",
      });
    }

    if (!title) {
      return res.status(400).json({
        message: "O título da task não foi informado",
      });
    }

    if (!content) {
      return res.status(400).json({
        message: "A tarefa precisa ter algum conteúdo",
      });
    }

    if (!status) {
      return res.status(400).json({
        message: "A tarefa precisa de um status",
      });
    }

    await sql`UPDATE tasks SET title = ${title}, content = ${content}, status = ${status} WHERE id = ${id};`;

    return res.status(200).send();
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor" });
  }
};

module.exports = updateTask;
