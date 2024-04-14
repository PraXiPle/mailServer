const { auth } = require("../middlewares/auth");
const jwt = require("jsonwebtoken");

const express = require("express"),
  router = express.Router(),
  service = require("../BL/user.service");

router.post("/register", async (req, res) => {
  res.send(await service.createUser(req.body));
});
router.get("/", async (req, res) => {
  res.send(await service.getUser());
});
router.post("/login",auth, async (req, res) => {
  const user = await service.login(req.body);

  jwt.sign(
    { userId: user._id },
    process.env.SECRET_KEY,
    { expiresIn: "1d" },
    (err, token) => {
      if (err) {
        return res.status(500).json({ message: "Error generating token!" });
      }
      // Set cookie with JWT, making it HttpOnly
      res
        .cookie("token", token, { httpOnly: true })
        .json(token)
        .json({ avatar: user.avatar, fullname: user.fullName })
        .send({ avatar: user.avatar, fullname: user.fullName });
    }
  );
  // res.send(await service.getUser())
});
module.exports = router;
