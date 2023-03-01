const mongoose = require('mongoose');
const registerSchema = new mongoose.Schema({
    username:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String,
        maxlength:500 
    },
   
})
const Register = new mongoose.model('Register',registerSchema);
module.exports = Register;
