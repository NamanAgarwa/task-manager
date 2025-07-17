const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  let token = null;
  // Check Authorization header
  if (
    req.header("Authorization") &&
    req.header("Authorization").startsWith("Bearer ")
  ) {
    token = req.header("Authorization").replace("Bearer ", "");
  }
  // Fallback: check cookies
  if (!token && req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId ? { id: decoded.userId } : decoded;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
};
