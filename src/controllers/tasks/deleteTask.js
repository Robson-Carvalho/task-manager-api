const Task = require("../../models/task");

const deleteTask = async (req, res) => {
  try {
    const { taskID } = req.body;

    if (!taskID) {
      return res.status(400).json({
        message: "O ID da tarefa não foi informado",
      });
    }

    Task.destroy({
      where: {
        id: taskID,
      },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor" });
  }
};

module.exports = deleteTask;
