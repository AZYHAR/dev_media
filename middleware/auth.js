const jwt = require('jsonwebtoken');
const config = require('config');

// A middleware function is basically
// function that has request and resopnse
// objects and call back
// that moves to another piece of middleware

// Exporting a middleware function
module.exports = function(req, res, next) {
  // Get token from header using request.header
  const token = req.header('x-auth-token');

  // Check if does not have token
  if (!token) {
    return res.status(401).json({
      msg: 'No token, authorization denied'
    });
  }

  // Verify token validation
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({
      msg: 'Token is not valid'
    });
  }
};
