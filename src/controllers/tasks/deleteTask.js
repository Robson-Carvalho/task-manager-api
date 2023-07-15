const sql = require("../../database/postgres");

const deleteTask = async (req, res) => {
  try {
    const { taskID } = req.body;

    if (!taskID) {
      return res.status(400).json({
        message: "O ID da tarefa não foi informado",
      });
    }

    await sql`DELETE FROM tasks WHERE id = ${taskID}`;

    res.status(204).send();
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = deleteTask;
