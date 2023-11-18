const Creature = require('../models/Creature');

exports.create = (data) => Creature.create(data);

exports.getAll = () => Creature.find();

exports.getOne = (creatureId) => Creature.findById(creatureId);