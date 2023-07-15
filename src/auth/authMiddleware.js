const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_KEY;

const authMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  const [_, token] = authorization.split(" ");

  try {
    const { id } = jwt.verify(token, secretKey);

    if (!id) {
      return res.status(401).json({ message: "Token não fornecido" });
    }

    req.userID = id;

    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido" });
  }
};

module.exports = authMiddleware;
