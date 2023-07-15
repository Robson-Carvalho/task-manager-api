const sql = require("../../database/postgres");

const createTask = async (req, res) => {
  try {
    const { title, content } = req.body;
    const id = req.userID;

    if (!id) {
      return res.status(400).json({
        message: "O ID do usuário não foi informado!",
      });
    }

    if (!title) {
      return res.status(400).json({
        message: "O título da task não foi informado",
      });
    }

    if (!content) {
      return res.status(400).json({
        message: "A tarefa precisar ter algum conteúdo",
      });
    }

    await sql`INSERT INTO tasks (id_user, title, content, status, created_at) VALUES (${id}, ${title}, ${content}, ${false}, NOW());`;

    res.status(201).send();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = createTask;