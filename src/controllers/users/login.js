const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../models/user");

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
    const isThereUser = await User.findOne({ where: { email: email } });

    if (!isThereUser) {
      return res.status(400).json({
        message: `E-mail ou senha está incorreto. Por favor, tente novamente!`,
      });
    }

    const checkPassword = await bcrypt.compare(
      password,
      isThereUser.dataValues.password
    );

    if (!checkPassword) {
      return res.status(422).json({
        message: "Senha inválida!",
      });
    }

    const { id, name } = isThereUser.dataValues;

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
