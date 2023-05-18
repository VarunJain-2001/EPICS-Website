const mongoose = require('mongoose');
const QuerySchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    mobile:{
        type:Number,
        maxlength:500 
    },
    regarding:{
        type:String
    },
    pickup:{
        type:String
    }
    ,
    subject:{
        type:String
    },
    query:{
        type:String
    }
   
})
const Query = new mongoose.model('Query',QuerySchema);
module.exports = Query;
