const creatureManager = require('../managers/creatureManager');
const userManager = require('../managers/userManager');

async function getCreatureVotesInfo(creatureId){
    const creature = await creatureManager.getOne(creatureId).lean();
    const userEmails = creature.votes.map(x => userManager.getInfo(x));
    return userEmails;
}



module.exports = getCreatureVotesInfo;