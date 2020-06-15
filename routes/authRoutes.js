const passport = require('passport');

module.exports = app => {
app.get('/auth/google', passport.authenticate('google',{
    scope: ['profile','email']
}));

app.get('/auth/google/callback', 
passport.authenticate('google'),
(req,res)=> res.redirect('/surveys'));

app.get('/api/logout', (req,res) =>{
    req.logout();//logout is the funciton attached to passport that kills the id and lets the user to logout.
    res.redirect('/');
});

app.get('/api/current_user', (req,res)=>{
    res.send(req.user);
})
}