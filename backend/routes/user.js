const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/user");

router.post("/sign-in", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input length
    if (username.length < 4) {
      return res
        .status(400)
        .json({ message: "Username must have at least 4 characters!" });
    }
    if (password.length < 4) {
      return res
        .status(400)
        .json({ message: "Password must have at least 4 characters!" });
    }

    let existingUser = await User.findOne({ username });
    let existingEmail = await User.findOne({ email });

    // Check for existing user and email
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists!" });
    }
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return res.status(500).json({ message: "Error generating salt!" });
      }
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) {
          return res.status(500).json({ message: "Error hashing password!" });
        }
        const newUser = new User({ username, email, password: hash });
        await newUser.save();
      });
    });
    return res.status(200).json({ message: "Signin successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server issue!" });
  }
});

router.post("/log-in", async (req, res) => {
  const { username, password } = req.body;
  let user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: "User doesn't exist!" });
  }
  bcrypt.compare(password, user.password, (err, data) => {
    if (data) {
      const authClaims = [{ name: username }, { jti: jwt.sign({}, "tcmTm") }];
      const token = jwt.sign({ authClaims }, "tcmTM", { expiresIn: "2d" });
      res.status(200).json({ id: user._id, token: token });
    } else {
      res.status(404).json({ message: "Invalid Credentials!" });
    }
  });
});

module.exports = router;
