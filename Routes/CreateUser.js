const express = require('express')
const app = express()
const router = express.Router()
const user = require('../Model/UserSchema')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')


//Routing to /createUser
router.post('/createUser', [
    body('email', 'incorrect email').isEmail(),
    body('name', 'Incorrect name').isLength({ min: 1 }),
    body('password', 'Incorrect Password').isLength({ min: 1 })
]

    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //password hashing
        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt)
        try {
            await user.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            })
            console.log('data create successfully');
            res.send('data created successfully');


        } catch (error) {
            console.log(error);
            console.log('data creaate Failed');

        }

    })
module.exports = router