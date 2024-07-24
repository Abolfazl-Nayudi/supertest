const jwt = require("jsonwebtoken");

const verifyJwtToken = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({ error: "access denied" });
    }

    const SECRET_KEY = process.env.SECRET_KEY;
    const decode = jwt.verify(token, SECRET_KEY);
    req.userId = decode.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "invalid token" });
  }
};

module.exports = verifyJwtToken;
