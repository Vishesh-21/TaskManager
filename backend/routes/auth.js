const jwt = require("jsonwebtoken");

const authenticationToken = (req, res, next) => {
  const authToken = req.headers["authorization"];
  // Ensure token exists, and split it correctly (expecting "Bearer <token>")
  const token = authToken && authToken.split(" ")[1];
  if (!token) {
    return res.status(400).json({ message: "User is not authenticated" });
  }

  jwt.verify(token, "tcmTM", (err, user) => {
    if (err) {
      return res.status(400).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });
};

module.exports = { authenticationToken };
