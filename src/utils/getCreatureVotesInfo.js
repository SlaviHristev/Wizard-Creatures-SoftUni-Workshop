const creatureManager = require('../managers/creatureManager');
const userManager = require('../managers/userManager');

async function getCreatureVotesInfo(creatureId){
    const creature = await creatureManager.getOne(creatureId).lean();
    const userPromises = creature.votes.map(x => userManager.getInfo(x));
    const userInfos = await Promise.all(userPromises)
    const userEmails = userInfos.map(info => info.email)
    return userEmails;
}



module.exports = getCreatureVotesInfo;