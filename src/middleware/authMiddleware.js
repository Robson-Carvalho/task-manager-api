const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({ message: "Token não fornecido" });
    }

    const [_, token] = authorization.split(" ");

    const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!id) {
      return res.status(401).json({ message: "Token não fornecido" });
    }

    req.userID = id;

    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido", error });
  }
};

module.exports = authMiddleware;
