const Task = require("../../models/task");

const readTask = async (req, res) => {
  try {
    const id = req.userID;

    const tasks = await Task.findAll({
      where: {
        userId: id,
      },
    });

    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor" });
  }
};

module.exports = readTask;
