const bcrypt = require("bcrypt");
const User = require("../../models/user");

const register = async (req, res) => {
  try {
    const { name, email, _password } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "O nome não foi informado. Por favor, tente novamente!",
      });
    }

    if (!email) {
      return res.status(400).json({
        message: "O e-mail não foi informado. Por favor, tente novamente!",
      });
    }

    const isThereUser = await User.findOne({ where: { email: email } });

    if (isThereUser) {
      return res.status(400).json({
        message: `O e-mail informado não está disponível. Por favor, tente novamente!`,
      });
    }

    if (!_password) {
      return res.status(400).json({
        message: "A senha não foi informada. Por favor, tente novamente!",
      });
    }

    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);
    const password = await bcrypt.hash(_password, saltRounds);

    await User.create({ name, email, password });

    res.status(201).send();
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor" });
  }
};

module.exports = register;
