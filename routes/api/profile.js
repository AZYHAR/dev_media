const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const mongoose = require('mongoose');
const {
    check,
    validationResult
} = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me', auth, async (req, res) => {
    try {
        // Get profile by user_id
        //
        const profile = await Profile.findOne({
            user: req.user.id
        }).populate('user', ['name', 'avatar']); // .populate will get data from user model and -> to profile fields (name, avatar)

        if (!profile) {
            return res.status(400).json({
                msg: 'There is no profile for this user'
            });
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post(
    '/',
    [
        auth,
        [
            check('status', 'Status is required')
            .not()
            .isEmpty(),
            check('skills', 'Skills is required')
            .not()
            .isEmpty()
        ]
    ],
    async (req, res) => {
        // Checked for errors 
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array
            });
        }

        // Pull everyting out of body
        const {
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body;

        // Build profile fields object
        const profileFields = {};
        profileFields.user = req.user.id;
        if (company) profileFields.company = company;
        if (website) profileFields.website = website;
        if (location) profileFields.location = location;
        if (bio) profileFields.bio = bio;
        if (status) profileFields.status = status;
        if (githubusername) profileFields.githubusername = githubusername;
        if (skills) {
            profileFields.skills = skills.split(',').map(skill => skill.trim());
        }

        // Build social object
        profileFields.social = {};
        if (youtube) profileFields.social.youtube = youtube;
        if (twitter) profileFields.social.twitter = twitter;
        if (facebook) profileFields.social.facebook = facebook;
        if (linkedin) profileFields.social.linkedin = linkedin;
        if (instagram) profileFields.social.instagram = instagram;


        try {
            // Look for profile for the user
            let profile = await Profile.findOne({
                user: req.user.id
            });

            if (profile) {
                // Update profile
                profile = await Profile.findOneAndUpdate({
                    user: req.user.id
                }, {
                    $set: profileFields
                }, {
                    new: true
                });
                return res.json(profile);
            }
            // Create new profile if does not exist
            profile = new Profile(profileFields);

            await profile.save();
            res.json(profile);
        } catch (err) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get('/', async (req, res) => {
    try {
        // .populate add to profiles from user model [name, avatar]
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get('/user/:user_id', async (req, res) => {
    try {
        // .populate add to profiles from user model [name, avatar]
        const profile = await Profile.findOne({
            user: req.params.user_id
        }).populate('user', ['name', 'avatar']);

        if (!profile) return res.status(400).json({
            msg: 'Profile not found'
        })

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        // Check if user_id does not exist
        // Show "no profile for user"
        // Instead Server Error
        if (err.kind == 'ObjectId') {
            return res.status(400).json({
                msg: 'Profile not found'
            })
        }
        res.status(500).send('Server Error');
    }
})

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete('/', auth, async (req, res) => {
    try {
        // ! @todo - remove user posts
        // Remove profile
        await Profile.findOneAndRemove({ user: req.user.user_id });
        
        // Remove user
        await User.findOneAndRemove({
            user: req.user.user_id
        });

        res.json({ msg: 'User deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;