const express = require('express')
const app = express()
const router = express.Router()
const user = require('../Model/UserSchema')
app.use(express.json());

const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
const jwtSecret = 'iAmMernStackDeveloper'
const bcrypt = require('bcryptjs')


router.post('/loginUser', [
    body('email', 'incorrect email').isEmail(),
    body('password', 'Incorrect Password').isLength({ min: 1 })],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email
        try {
            let userData = await user.findOne({ email })
            if (!userData) {
                return res.status(400).json({ error: "Invalid email or password" });;
            }
            //jwt Token 
            const pwdcomapre = await bcrypt.compare(req.body.password, userData.password)
            if (!pwdcomapre) {
                return res.status(400).json({ error: "Invalid email or password" });
            }
            const data = {
                user: {
                    id: userData.id
                }
            }
            //auth token generate
            const authToken = jwt.sign(data, jwtSecret)
            return res.status(200).json({ success: true, message: "Login successful", authToken: authToken })

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal Server Error" });

        }

    })
module.exports = router