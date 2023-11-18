const router = require('express').Router();
const creatureManager = require('../managers/creatureManager')
const userManager = require('../managers/userManager')

router.get('/create', (req,res) =>{
    res.render('creature/create')
});

router.post('/create', async (req,res) => {
    const {name,species,skinColor,eyeColor,imageUrl,description} = req.body;
    const ownerId = req.user._id;
    await creatureManager.create({name,species,skinColor,eyeColor,imageUrl,description,ownerId});
    res.redirect('/catalog')
});

router.get('/creature/:creatureId/details', async (req,res) =>{
    const creatureId = req.params.creatureId;
    const creature = await creatureManager.getOne(creatureId).lean();
    const ownerInfo = await userManager.getInfo(creature.ownerId).lean();
    const isOwner = req.user?._id === creature.ownerId?.toString();
    const hasVoted = !isOwner && creature.votes?.map(id => id.toString()).includes(req.user?._id.toString());
    console.log(hasVoted);

    
    res.render('creature/details', {creature, ownerInfo,isOwner,hasVoted});
});

module.exports = router;