const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_KEY;

function authMiddleware(req, res, next) {
  const authorizationHeader = req.headers["authorization"];

  if (!authorizationHeader) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  const [bearer, token] = authorizationHeader.split(" ");

  if (bearer !== "Bearer" || !token) {
    return res.status(401).json({ message: "Token inválido" });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: err });
    }

    next();
  });
}

module.exports = authMiddleware;
