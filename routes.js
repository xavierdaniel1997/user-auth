const express = require('express');
const router = express.Router();

const credential = {
    email : 'admin@gmail.com',
    password : 'admin123',
}

router.get('/', (req, res) => {
    if(req.session.user){
        res.render('signup', {error: req.session.error, message: "Your are already signed"})
    }else{
        res.render('signup', {error: req.session.error})
    }
    
});

// Login section
router.post('/login', (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        req.session.error = 'email and password are required';
        res.redirect('/')
    }

    if(email===credential.email && password===credential.password){
        req.session.user = email;
        console.log(req.body.email);
        return res.redirect("/home")
    }else{
        req.session.error =  "Invalid email or password";
        res.redirect('/')
    }
})

// Logout Section

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err){
            return res.status(500).send('Server error')
        }
        res.redirect('/');
    })
})


router.get('/home', (req, res) => {
    if (req.session.user) {
        res.render('home');
    } else {
        res.redirect('/');
    }
});
module.exports =  router;