const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
// Is using express validator for json field validation
const {
    check,
    validationResult
} = require('express-validator');

const User = require('../../models/User');

// @route    GET api/auth
// @desc     Test route
// @access   Public
// by adding auth as the second parameter
// route will request JWT token to visit this route 
router.get('/', auth, async (req, res) => {
    // Call to database
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        req.status(500).send('Server Error');
    }
});

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
    '/',
    [
        // Fields validation
        check('email', 'Please include a valid email').isEmail(),
        check('password','Password is required').exists()
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

        const {
            email,
            password
        } = req.body;

        try { // Error handling
            let user = await User.findOne({ email }); // Mongoose query async-away

            if (!user) { // See if user exists
                return res
                    .status(400)
                    .json({
                        errors: [{
                            msg: 'Invalid Credentials'
                        }]
                    });
            }


            // Match user password and login password
            
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res
                    .status(400)
                    .json({
                        errors: [{
                            msg: 'Invalid Credentials'
                        }]
                    });
            }

            // Return jsonwebtocken
            //  Will allow user to go strictly to a webpage
            //  after registration

            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload,
                config.get('jwtSecret'), {
                    expiresIn: 360000
                },
                (err, token) => {
                    if (err) throw err;
                    res.json({
                        token
                    });
                });

        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server error')
        }

    }
);

module.exports = router;