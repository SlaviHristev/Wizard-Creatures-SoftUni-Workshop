const mongoose = require('mongoose');
const creatureSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    species:{
        type:String,
        required:true,
    },
    skinColor:{
        type:String,
        required:true,
    },
    eyeColor:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
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