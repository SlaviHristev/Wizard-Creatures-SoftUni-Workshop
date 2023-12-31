const Creature = require('../models/Creature');

exports.create = (data) => Creature.create(data);

exports.getAll = () => Creature.find();

exports.getOne = (creatureId) => Creature.findById(creatureId);

exports.delete = (id) => Creature.findByIdAndDelete(id);

exports.edit = (creatureId,data) => Creature.findByIdAndUpdate(creatureId,data);

exports.vote = (creatureId, userId) => Creature.findByIdAndUpdate(creatureId,  {$push: {votes: userId}});

exports.getAllPersonalPosts = async (userId) =>  {
    const creatures = await Creature.find().lean();
    creatures.filter(x => x.ownerId === userId);

    return creatures;
    
    
}