const mongoose = require('mongoose');
const creatureSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Name is required!'],
        minlength: [2, 'Length must be at least 2 symbols long!']
    },
    species:{
        type:String,
        required:[true, 'Species is required'],
        minlength: [3, 'Length must be at least 3 symbols long!']
    },
    skinColor:{
        type:String,
        required:[true, 'SkinColour is required!'],
        minlength: [3, 'Length must be at least 3 symbols long!']
    },
    eyeColor:{
        type:String,
        required:[true, 'EyeColor is required!'],
        minlength: [3, 'Length must be at least 3 symbols long!']
    },
    imageUrl:{
        type:String,
        required:[true, 'Image URL is required!'],
        validate: {
            validator: (value) => {
              return /^https?:\/\//.test(value);
            },
            message: props => `${props.value} is not a valid image URL. It should start with "http://" or "https://".`
          }
    },
    description:{
        type:String,
        required:[true, 'Description is required!'],
        minlength:[5, 'Length must be at least 10 symbols long!'],
        maxLength: [500, 'Length should be not more than 500 characters!']
    },
    ownerId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
    },
    votes:{
        type: mongoose.Types.ObjectId,
        ref:'User'
    },
})

const Creature = mongoose.model('Creature', creatureSchema);

module.exports = Creature;