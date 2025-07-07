const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({ success: false, error: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, "secretkey");
    const user = await User.findById(decoded.id).select("-password");
    if (!user) throw new Error();

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: "Token invalid or expired" });
  }
};

module.exports = auth;


const restrictTo = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: 'You do not have permission to perform this action'
      });
    }
    next();
  };
};

module.exports = { auth, restrictTo };

