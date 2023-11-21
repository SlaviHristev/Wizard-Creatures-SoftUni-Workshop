const router = require('express').Router();
const creatureManager = require('../managers/creatureManager')
const userManager = require('../managers/userManager')
const getCreatureVotesInfo = require('../utils/getCreatureVotesInfo');
const {extractErrorMessages} = require('../utils/errorHelper');

router.get('/create', (req,res) =>{
    res.render('creature/create')
});

router.post('/create', async (req,res) => {
    try {
        const {name,species,skinColor,eyeColor,imageUrl,description} = req.body;
        const ownerId = req.user._id;
        await creatureManager.create({name,species,skinColor,eyeColor,imageUrl,description,ownerId});
        res.redirect('/catalog')        
    } catch (error) {
        const errors = extractErrorMessages(error);
        res.render('creature/create', {errors}); 
    }
});

router.get('/creature/:creatureId/details', async (req,res) =>{
    try {
        const creatureId = req.params.creatureId;
        const creature = await creatureManager.getOne(creatureId).lean();
        const ownerInfo = await userManager.getInfo(creature.ownerId).lean();
        const isOwner = req.user?._id === creature.ownerId?.toString();
        const hasVoted = !isOwner && creature.votes?.map(id => id.toString()).includes(req.user?._id.toString());
        const emails = await getCreatureVotesInfo(creatureId);  
        res.render('creature/details', {creature, ownerInfo,isOwner,hasVoted,emails});
    } catch (error) {
        const errors = extractErrorMessages(error);
        res.render('creature/details', {errors}); 
    }   
});

router.get('/creature/:creatureId/delete', async (req,res) =>{
    try {
        const creatureId = req.params.creatureId;
        await creatureManager.delete(creatureId);
        res.redirect('/catalog');
        
    } catch (error) {
        const errors = extractErrorMessages(error);
        res.render('/catalog', {errors}); 
    }
});

router.get('/creature/:creatureId/edit',async (req,res) =>{
    try {
        const creature = await creatureManager.getOne(req.params.creatureId).lean();
        res.render('creature/edit', {creature});
        
    } catch (error) {
        const errors = extractErrorMessages(error);
        res.render('creature/edit', {errors}); 
    }
});

router.post('/creature/:creatureId/edit', async(req,res) => {
    try {
        const creatureId = req.params.creatureId;
        const {name,species,skinColor,eyeColor,imageUrl,description} = req.body;
        await creatureManager.edit(creatureId,{name,species,skinColor,eyeColor,imageUrl,description});
        res.redirect(`/creature/${creatureId}/details`);
        
    } catch (error) {
        const errors = extractErrorMessages(error);
        res.render('creature/edit', {errors}); 
    }
})

router.get('/creature/:creatureId/vote', async(req,res) =>{
    try {
        const creatureId = req.params.creatureId;
        const userId = req.user._id;
        await creatureManager.vote(creatureId,userId);
        res.redirect(`/creature/${creatureId}/details`);
        
    } catch (error) {
        const errors = extractErrorMessages(error);
        res.render('/catalog', {errors}); 
    }
})

module.exports = router;