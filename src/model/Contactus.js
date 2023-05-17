const mongoose = require('mongoose');
const ContactusSchema = new mongoose.Schema({
    name:{
        type:String
    },
    address:{
        type:String
    },
    mobile:{
        type:Number,
        maxlength:500 
    },
    email:{
        type:String,
    },
    message:{
        type:String
    },
    donation:{
        type:String
    }
   
})
const Contactus = new mongoose.model('Contactus',ContactusSchema);
module.exports = Contactus;
