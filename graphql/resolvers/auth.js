const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');
const admin = require('firebase-admin');
module.exports = {
    createUser: async ({ userInput }) => {
        return admin.auth().verifyIdToken(userInput.firebase_token)
            .then(async (decodedToken) =>{
                let firebase_uuid = decodedToken.uid;
                const existingUser = await User.findOne({ firebase_uuid: firebase_uuid })
                if (existingUser) {
                    const token = jwt.sign(existingUser.auth_token_payload, process.env.JWT_KEY);
                    return { userId: existingUser.id, token: token, tokenExpiration: 1 }
                }
                const user = new User({
                    firebase_uuid: firebase_uuid,
                });
                await user.save();
                const token = jwt.sign(user.auth_token_payload, process.env.JWT_KEY);
                return { userId: user.id, token: token, tokenExpiration: 1 }
            }).catch(function (error) {
                throw error;
            });
    }, 
    jwtToken: async ({ firebase_id })=>{
        const existingUser = await User.findOne({ firebase_uuid: firebase_id })
        const token = jwt.sign(existingUser.auth_token_payload, process.env.JWT_KEY);
        return { userId: existingUser.id, token: token, tokenExpiration: 1 }
    }
};