const Task = require("../../models/task");

const createTask = async (req, res) => {
  try {
    const { title, content } = req.body;
    const id = req.userID;

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

    await Task.create({ userId: id, title, content });

    res.status(201).send();
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor" });
  }
};

module.exports = createTask;
