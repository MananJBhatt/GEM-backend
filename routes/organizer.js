const {Router}= require('express');
const Organizer = require('../models/organizer');

const router = Router();

router.get('/signin', (req, res) => {    
   return res.render('signino');
});
console.log('Organizer', Organizer)
router.get('/signup', (req, res) => {    
   return res.render('signupo');
});

router.post('/signin', async function (req, res)  {    
    try {
        const {email,password}= req.body;
    const token = await Organizer.matchPasswordAndGenerateToken(email,password)
    
    return res.cookie('token',token).redirect('/');
    } catch (error) {
        res.render('signino',{error:"Invalid email or password"});
    }
});


router.post('/signup', async (req, res) => {  
    const {fullName,email,password}= req.body;
    await Organizer.create({
        fullName,
        email,
        password,
    });
    console.log('Organizer', Organizer)
    return res.redirect('/');
}); 

router.post('/signup', async (req, res) => {  
    const {fullName,email,password}= req.body;
    await Organizer.create({
        fullName,
        email,
        password,
    });
    return res.redirect('/');
}); 


router.get('/logout', (req, res) => {    
    return res.clearCookie('token').redirect('/');
 }); 

module.exports = router;