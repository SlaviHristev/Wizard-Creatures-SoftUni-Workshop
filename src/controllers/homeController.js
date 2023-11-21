const router = require('express').Router();
const creatureManager = require('../managers/creatureManager');
const {extractErrorMessages} = require('../utils/errorHelper');

router.get('/', (req,res) =>{
    res.render('home');
});

router.get('/catalog', async (req,res) => {
    try {
        
        const creatures = await creatureManager.getAll().lean();
        res.render('catalog', {creatures});
        
    } catch (error) {
        const errors = extractErrorMessages(error);
        res.render('/catalog', {errors});
    }

})


module.exports = router;