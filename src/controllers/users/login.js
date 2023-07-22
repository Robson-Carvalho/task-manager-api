const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sql = require("../../database/postgres");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({
        message:
          "O e-mail não foi informado. Por favor, tente novamente utilizando outro e-mail!",
      });
    }

    if (!password) {
      return res.status(400).json({
        message: "A senha não foi informada. Por favor, tente novamente!",
      });
    }

    const result = await sql`SELECT * FROM users WHERE email = ${email}`;

    if (!Object.keys(result).length) {
      return res
        .status(400)
        .json({ message: `Não há usuário cadastrado com o e-mail ${email}` });
    }
    const checkPassword = await bcrypt.compare(password, result[0].password);

    if (!checkPassword) {
      return res.status(422).json({
        message: "Senha inválida!",
      });
    }
    const { id, name } = result[0];

    const token = jwt.sign({ id: id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "24h",
    });

    res.status(200).json({
      user: name,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor" });
  }
};

module.exports = login;
