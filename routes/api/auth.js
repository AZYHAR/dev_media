const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')

const User = require('../../models/User');

// @route    GET api/auth
// @desc     Test route
// @access   Public

// by adding auth as the second parameter
// route will request JWT token to visit this route 
router.get('/', auth, async(req, res) => {
    // Call to database
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        req.status(500).send('Server Error');
    }
});

module.exports = router;