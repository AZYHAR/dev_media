const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
// Is using express validator for json field validation
const { check, validationResult } = require('express-validator');

// Get User Model
const User = require('../../models/User');

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  '/',
  [
    // Fields validation
    check('name', 'Name is reqiured')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more chararcters'
    ).isLength({
      min: 6
    })
  ],
  async (req, res) => {
    // Will get all the results from Fields validation
    // If any errors
    const errors = validationResult(req);

    // If erorrs is not empty then return 400 request with log of errors in json
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { name, email, password } = req.body;

    try {
      // Error handling

      let user = await User.findOne({
        email
      }); // Mongoose query async-away

      if (user) {
        // See if user exists
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      // Get users gravatar
      const avatar = gravatar.url(email, {
        s: '200', // Default size,
        r: 'pg',
        d: 'mm' // default image
      });

      // Create an instance of user
      user = new User({
        name,
        email,
        avatar,
        password
      });

      // Encrypt password using bcryptjs and save user
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Return jsonwebtocken
      //  Will allow user to go strictly to a webpage
      //  after registration

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server error');
    }
  }
);

module.exports = router;
