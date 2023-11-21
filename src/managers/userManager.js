const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../library/jwt');
const SECRET = require('../config/SECRET');



exports.register = (userData) => User.create(userData);

exports.login = async (email,password) => {
    const user = await User.findOne({email});
    if(!user){
        throw new Error('Email or Password is incorrect!');
    };

    const isValid = await bcrypt.compare(password, user.password);
    if(!isValid){
        throw new Error('Email or Password is incorrect!');
    };

    const payload ={
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,

    };

    const token = await jwt.sign(payload,SECRET, {expiresIn: '1d'});

    return token;
};

exports.getInfo = (id) => User.findById(id).select('firstName lastName email');