const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sql = require("../database/postgres");

const register = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "O e-mail não foi informado. Por favor, tente novamente!",
      });
    }

    const result = await sql`SELECT * FROM users WHERE email = ${email}`;

    if (Object.keys(result).length) {
      return res.status(400).json({
        message: `O e-mail ${email} já está registrado. Por favor, tente novamente!`,
      });
    }

    if (!name) {
      return res.status(400).json({
        message: "O nome não foi informado. Por favor, tente novamente!",
      });
    }

    if (!password) {
      return res.status(400).json({
        message: "A senha não foi informada. Por favor, tente novamente!",
      });
    }

    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await sql`INSERT INTO users (email, name, password) VALUES (${email}, ${name}, ${hashedPassword});`;

    const user = await sql`SELECT * FROM users WHERE email = ${email}`;
    const { id } = user[0];

    const token = jwt.sign({ email: email }, process.env.JWT_SECRET_KEY, {
      expiresIn: "24h",
    });

    res.json({
      user: { id, name },
      token: token,
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports = register;
