const jwt = require("jsonwebtoken");
const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log(token);
    if (!token) {
      return res.status(403).json({ message: "Token is required!" });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) return res.sendStatus(403);
      req.body.user = user;
      next();
    });
  } catch (error) {
    res.sendStatus(401);
  }
};
module.exports = { auth };
