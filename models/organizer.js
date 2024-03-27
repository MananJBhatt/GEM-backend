const { createHmac, randomBytes } = require('node:crypto');
const crypto = require('crypto');
const { Schema, model } = require('mongoose');
const { createUserToken } = require('../utils/authentication');
const organizerSchema = new Schema({

    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },//last name // college // number // EID // 
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'organizer',
        enum: ['admin','organizer']
    },
}, { timestamps: true });

organizerSchema.pre("save", function (next) {

    const user = this;
    if (!user.isModified("password")) return;
    const salt = randomBytes(16).toString();
    const hashedpassword = createHmac("sha256", salt)
        .update(user.password)
        .digest("hex");

    this.salt = salt;
    this.password = hashedpassword;

    next();
});

organizerSchema.static('matchPasswordAndGenerateToken', async function (email, password) {
    // const user = await this.findOne({email});
    // console.log('User',user)    
    // if(!user) throw new Error('User not found');
    // const salt = user.salt;
    // const hashedpassword = user.password;
    // const userHash =crypto.createHmac('sha256',salt)
    // .update(user.password)
    // .digest('hex');
    const org = await this.findOne({ email });
    console.log('Organizer', org)    

    if (!org) throw new Error('User not found');
    const salt = org.salt;
    const hashedPassword = org.password;
    const userHash = crypto.createHmac('sha256', salt)
        .update(password)
        .digest('hex');

     console.log(userHash);
     console.log(hashedPassword);

    if (userHash !== hashedPassword) throw new Error('Invalid password');

    const token = createUserToken(org);
    return token;
});


const organizer = model('organizer', organizerSchema);

module.exports = organizer;
