const { Types } = require('mongoose')
const userModel = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'mysecretkey';
const { redisClient } = require('../middleware/redisClient');
const { addJob } = require('../middleware/bullmqClient')


const registerUser = async (req, res) => {
    try {
        const { name, email, password, mobile, dob } = req.body;
        const findUser = await userModel.findOne({ email });
        if(findUser) {
            return res.json({
                meta: { msg: "User already exists..", status: false }
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const obj = {
            name,
            email,
            password: hashedPassword,
            passwordText: password,
            mobile,
            dob
        }
        const user = await new userModel(obj).save();
        let to = user.email;
        let subject = "Registration successful";
        let bodyText = "Thankyou for registration";
        let bodyHtml = "<h1>Thankyou for registration</h1>"
        await addJob({
            to,
            subject,
            bodyText,
            bodyHtml
        });
        return res.json({
            meta: { msg: "User registered successfully", status: true },
            data: user
        });
    } catch(e) {
        return res.json({
            meta: { msg: e.message, status: false }
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
          throw new Error('Invalid email or password');
        };
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            throw new Error('Invalid email or password');
        };
        let jwtObj = {
            userId: user.userId,
            email: user.email,
            mobile: user.mobile
        };
        const token = jwt.sign(jwtObj, JWT_SECRET, { expiresIn: '24h' });
        return res.json({
            meta: { msg: "User loggedIn successfully.", status: true },
            data: user,
            token
        });
    } catch(e) {
        return res.json({
            meta: { msg: e.message, status: false }
        })
    }
}

const getProfile = async (req, res) => {
    try {
        const { userId } = req.user;
        
        let key = `${req.originalUrl}:${userId}`;
        const data = await redisClient.get(key)
        if (data) {
            console.log('Data retrieved from cache', key);
            return res.json({
                meta: { msg: "Data found successfully", status: true },
                ...JSON.parse(data),
            });
        }

        const getDetails = await userModel.findOne({ userId });
        if(!getDetails) {
            return res.json({
                meta: { msg: "Data not found", status: false }
            });
        };

        console.log(`Data not found in cache: ${key}`);
        await redisClient.set(key, JSON.stringify({
            data: getDetails
        }));
        //await redisClient.expire(key, '100') //in secs
        console.log(`Data saved in cache memory: ${key}`);
        
        return res.json({
            meta: { msg: "Data found successfully", status: true },
            data: getDetails
        });
    } catch(e) {
        return res.json({
            meta: { msg: e.message, status: false }
        })
    }
}

module.exports = {
    registerUser,
    login,
    getProfile
};