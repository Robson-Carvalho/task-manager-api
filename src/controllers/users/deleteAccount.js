const sequelize = require("../../database/index");
const Task = require("../../models/task");
const User = require("../../models/user");

const deleteAccount = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const userID = req.userID;

    await Task.destroy({
      where: {
        userId: userID,
      },
    });

    await User.destroy({
      where: {
        id: userID,
      },
    });

    await transaction.commit();

    res.status(204).send();
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: "Erro no servidor" });
  }
};

module.exports = deleteAccount;
