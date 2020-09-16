const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // const token = req.header('auth-token');
  const token = req.cookies.jwt;
  console.log(req.cookies);
  if (!token) {
    return res.status(401).send('Not Authenticated!');
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};
