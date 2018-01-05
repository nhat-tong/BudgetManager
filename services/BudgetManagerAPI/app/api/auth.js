const mongoose = require('mongoose'),
      jwt = require('jsonwebtoken'),
      config = require('@config');

const api = {};
// login
api.authenticate = (User) => (req, res) => {
    User.findOne({ username: req.body.username }, (error, user) => {
        if(error) throw error;

        if(!user) return res.status(401).send({ success: false, message: 'Authentication failed. User not found.'});
        // check user password from request
        user.comparePassword(req.body.password, (error, matches) => {
            if(error || !matches) {
                return res.status(401).send({ success: false, message: 'Authentication failed. Wrong password.'});
            }
            const token = jwt.sign({ user }, config.secret);
            return res.json({ success: true, message: 'Token granted', token: token });
        })
    })
}

// verify
api.verify = (headers) => {
    if(headers && headers.authorization) {
        const split = headers.authorization.split(' ');
        if(split.length === 2) return split[1];
        return null;
    }
    else return null;
}

module.exports = api;