const router = require("express").Router();
const { User } = require("../../models");

// For signing up users
router.post("/", async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// For existing users to log in
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData) {
      // Change to be "Incorrect email or password after testing"
      res.status(400).json({ message: "Incorrect email" });
      return;
    }
    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      // Change to be "Incorrect email or password after testing"
      res.status(400).json({ message: "Incorrect password" });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res
        .status(200)
        .json({ user: userData, message: "You have successfully logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// When a user is logged out
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
