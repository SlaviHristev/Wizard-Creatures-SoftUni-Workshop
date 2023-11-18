const router = require('express').Router();
const creatureManager = require('../managers/creatureManager');

router.get('/', (req,res) =>{
    res.render('home');
});

router.get('/catalog', async (req,res) => {
    const creatures = await creatureManager.getAll().lean();
    res.render('catalog', {creatures});
})


module.exports = router;