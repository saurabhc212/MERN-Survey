const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
require('./modals/User');
require('./modals/Survey');
require('./services/passport');


mongoose.connect(keys.mongoURI,(err,db)=>{
    console.log('err', err);
});

const app = express();

app.use(bodyParser.json());

app.use(
    cookieSession({
        maxAge: 30*24*60*60*1000, //this cookie will last for 30 days
        keys:[keys.cookieKey]
    })
)

app.use(passport.initialize());
app.use(passport.session());
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });// if server don't know what route it is, just serve index.html page
}
const PORT = process.env.PORT || 5000; 
app.listen(PORT, function(){
    console.log('Your app is running on port'+PORT);
});