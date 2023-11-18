const router = require('express').Router();
const creatureManager = require('../managers/creatureManager')

router.get('/create', (req,res) =>{
    res.render('creature/create')
});

router.post('/create', async (req,res) => {
    const {name,species,skinColor,eyeColor,imageUrl,description} = req.body;
    const ownerId = req.user._id;
    await creatureManager.create({name,species,skinColor,eyeColor,imageUrl,description,ownerId});
    res.redirect('/catalog')
})

module.exports = router;