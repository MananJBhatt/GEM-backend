const {Router}= require('express');
const Event = require('../models/events')
const Organizer = require('../models/organizer');

const router = Router();

router.get('/add-new-event', (req, res) => {
    console.log(req.user);
    return res.render('newEvent', {
        user: req.user
    });
});

router.get('/eventlist', async (req, res) => {
    console.log(req.user)
    const events = await Event.find().populate('organizedBy');
    const user = await Organizer.findById(req.user.id);
    return res.render('eventlist', {
        events,
        user
    });
});
router.post('/',async (req, res) => { 
    console.log(req.user);
    const {eventName,eventDescription,eventDate}=req.body;
    console.log(eventName,eventDescription,eventDate);
    console.log("uSER" + req.user.id);
    const event = await Event.create({
        eventName,
        eventDescription,
        eventDate,
        organizedBy: req.user.id,
        name:req.user.email
    });  
     res.redirect(`/events`);
});

module.exports = router;
