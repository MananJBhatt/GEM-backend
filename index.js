require('dotenv').config();
const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const path = require('path');
const userRoute = require('./routes/user');
const eventRoute = require('./routes/events')
const orgRoute = require('./routes/organizer');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const checkForAuthenticationCookie = require('./middlewares/authentication');
const Event = require('./models/events');
const User = require('./models/user');
const organizer = require('./models/organizer');


mongoose.connect(process.env.MONGO_URL).then((e) => { console.log('Connected to DB') });


app.set('view engine', 'ejs');
app.set("views", path.resolve("./view"));
app.use(bodyParser.urlencoded());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'));
app.use(express.static(path.resolve('./public')));

app.get('/', async (req, res) => {
    const allEvents = await Event.find({});
        res.render('home',{
            role:req.role,
            user:req.user,
            events:allEvents,
            organizedBy:await organizer.find({})
        });
});

 app.use('/user', userRoute);
 app.use('/events', eventRoute);
 app.use('/organizer', orgRoute); 


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
