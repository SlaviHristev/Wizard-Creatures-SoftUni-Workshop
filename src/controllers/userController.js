const router = require('express').Router();
const userManager = require('../managers/userManager');
const creatureManager = require('../managers/creatureManager');

router.get('/register', (req,res) =>{
    res.render('user/register');
});

router.post('/register', async (req,res) =>{
    const {firstName,lastName,email,password,repeatPassword} = req.body;
    await userManager.register({firstName,lastName,email,password,repeatPassword});
    res.redirect('/');
});

router.get('/login', (req,res) =>{
    res.render('user/login');
});

router.post('/login', async (req,res) => {
    const {email,password} = req.body;
    const token = await userManager.login(email,password);
    res.cookie('token', token, {httpOnly: true});
    res.redirect('/');
});

router.get('/logout', (req,res) =>{
    res.clearCookie('token');
    res.redirect('/');
});

router.get('/profile', async (req,res) =>{
    const userId = req.user._id;
    const creatures = await creatureManager.getAllPersonalPosts(userId);
    const userName = req.user.firstName + ' ' + req.user.lastName
    res.render('user/profile', { creatures, userName });
    console.log(userName);
})

module.exports = router;