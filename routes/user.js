const {Router}= require('express');
const User = require('../models/user');

const router = Router();

router.get('/signin', (req, res) => {    
   return res.render('signin');
});

router.get('/signup', (req, res) => {    
   return res.render('signup');
});

router.get('/userlist', async (req, res) => {
    const users = await User.find();
    return res.render('userList', {
        users
    });
}
);


// router.get('/update', (req, res) => {    
//     return res.render('update');
//  });

router.post('/signin', async function (req, res)  {    
    try {
        const {email,password}= req.body;
    const token = await User.matchPasswordAndGenerateToken(email,password)
    
    return res.cookie('token',token).redirect('/');
    } catch (error) {
        res.render('signin',{error:"Invalid email or password"});
    }
});

router.post('/signup', async (req, res) => {  
    const {fullName,email,password}= req.body;
    await User.create({
        fullName,
        email,
        password,
    });
    return res.redirect('/');
}); 

// router.post('/update', async (req, res) => {  
//     const {email,oldPassword,newPassword}= req.body;
//     await User.updatePassword(email,oldPassword,newPassword);

//     const token = await User.matchPasswordAndGenerateToken(email,password)
    
    
// });



router.get('/logout', (req, res) => {    
    return res.clearCookie('token').redirect('/');
 }); 

module.exports = router;
