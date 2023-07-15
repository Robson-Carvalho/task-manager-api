const sql = require("../../database/postgres");

const deleteAccount = async (req, res) => {
  try {
    const userID = req.userID;

    await sql`DELETE FROM tasks WHERE id_user = ${userID}`;

    await sql`DELETE FROM users WHERE id = ${userID}`;

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = deleteAccount;
