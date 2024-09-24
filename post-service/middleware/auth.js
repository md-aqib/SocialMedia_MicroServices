const jwt = require('jsonwebtoken');
const JWT_SECRET = 'mysecretkey';

const auth = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({
    meta: { msg: "Access Denied", status: false }
  });

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    console.log(err)
    res.status(400).json({
      meta: { msg: "Invalid Token", status: false }
    });
  }
};

module.exports = auth;
