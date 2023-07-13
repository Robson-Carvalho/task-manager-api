const sql = require("../database/postgres");

const home = async (req, res) => {
  const result = await sql`select version()`;

  res.status(200).json({ result });
};

module.exports = home;
