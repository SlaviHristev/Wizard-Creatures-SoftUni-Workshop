const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true, 'First name is required!'],
        minLength: [3, 'First name should be at least 3 symbols long!']
    },
    lastName:{
        type:String,
        required:[true, 'Last name is required!'],
        minLength: [3, 'Last name should be at least 3 symbols long!']
    },
    email:{
        type:String,
        required:[true, 'Email is required!'],
        minLength: [10, 'Email name should be at least 10 symbols long!']
    },
    password:{
        type:String,
        required:[true, 'Password is required!'],
        minLength: [4, 'Password should be at least 4 characters long!'],
        validate:{
            validator: function(value){
                return /^[A-Za-z0-9]+$/.test(value)
            },
            message: 'Invalid Password'
        }
    }
});

userSchema.virtual('repeatPassword')
.set(function(value){
    if(value !== this.password){
        throw new Error('Passwords missmatch!')
    }
});

userSchema.pre('save', async function(){
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
});

const User = mongoose.model('User', userSchema);

module.exports = User;