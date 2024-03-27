const { Schema, model } = require('mongoose');
const eventSchema = new Schema({

    eventName:{
        type:String,
        required:true
    },
    eventDescription:{
        type:String,
        required:true
    },// eventType // 
    eventDate:{
        type:Date,
        required:true
    },
    location:{
        type:String,
    },
    instituteName:{
        type:String,
        // required:true
    }
    ,// organizer Name or Institute 
    organizedBy:{
        type:Schema.Types.ObjectId,
        ref:'user'
    }

},{timestamps:true});

const Event  = model('Event',eventSchema);

module.exports = Event;