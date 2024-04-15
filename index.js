const express = require('express');
const router = require('./routes');
const session = require('express-session');
const checkAuth = require('./middleware');
const app = express();

const PORT = 3000;

app.set('view engine', 'ejs')

app.use(express.static('public'));
app.use(express.static('public/assets'))
app.use(express.urlencoded({extended: true}));


app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))

app.use(checkAuth)

// Middleware to set cache control headers
app.use((req, res, next) => {
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    next();
});

app.use('/', router);

   
   

app.listen(PORT, () => {
    console.log(`Server start running on http://localhost:${PORT}`);
})
