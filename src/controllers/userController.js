const router = require('express').Router();
const userManager = require('../managers/userManager');
const creatureManager = require('../managers/creatureManager');
const {extractErrorMessages} = require('../utils/errorHelper');

router.get('/register', (req,res) =>{
    res.render('user/register');
});

router.post('/register', async (req,res) =>{
    try {
        const {firstName,lastName,email,password,repeatPassword} = req.body;
        await userManager.register({firstName,lastName,email,password,repeatPassword});
        res.redirect('/');
        
    } catch (error) {
        const errors = extractErrorMessages(error);
        res.render('user/register', {errors});
    }
});

router.get('/login', (req,res) =>{
    res.render('user/login');
});

router.post('/login', async (req,res) => {
    try {
        const {email,password} = req.body;
        const token = await userManager.login(email,password);
        res.cookie('token', token, {httpOnly: true});
        res.redirect('/');
    } catch (error) {
        const errors = extractErrorMessages(error);
        res.render('user/login', {errors});
        
    }
});

router.get('/logout', (req,res) =>{
    res.clearCookie('token');
    res.redirect('/');
});

router.get('/profile', async (req,res) =>{
    try {
        const userId = req.user._id;
        const creatures = await creatureManager.getAllPersonalPosts(userId);
        const userName = req.user.firstName + ' ' + req.user.lastName
        res.render('user/profile', { creatures, userName });
        
    } catch (error) {
        const errors = extractErrorMessages(error);
        res.redirect('user/profile', {errors}) 
    }
    
})

module.exports = router;