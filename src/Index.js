const express = require("express");
const app = express();
const mongoose = require('mongoose');
const Register = require("./model/Register");
const Query = require('./model/Query');
const ContactUs = require('./model/Contactus');
const port = process.env.PORT ||2000;
const cors = require('cors');
const Contactus = require("./model/Contactus");
app.use(express.json());
app.use(cors());
mongoose.connect("mongodb+srv://ayushh:ayush@cluster0.yqrvv.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log('connected to db');
})
.catch((e)=>{
    console.log(e);

})

app.get('/',(req,res)=>{
    res.send("hi");
})
app.post("/register",async(req,res)=>{
    
        const register =  await new Register({
            username:req.body.username,
            email:req.body.email,
            password:req.body.password
        });
        const insertR = await register.save();
        res.send(insertR);
        console.log(insertR);
    
})    

app.post("/signin",async(req,res)=>{
    const email = req.body.email;
    const user = await Register.findOne({email:email});
    if(user){
        if(user.password==req.body.password){
            console.log("user verified");
            res.send(`welcome ${user.username} !`);
        }
        else{
            res.send("wrong password!")
        }
    }
    else{
        console.log("User not found");
        res.send("User not found");
    }

    
})
app.post('/query',async(req,res)=>{
    const query = await new Query({
        name:req.body.name,
        email:req.body.email,
        mobile:req.body.mobile,
        regarding:req.body.regarding,
        pickup:req.body.pickup,
        subject:req.body.subject,
        query:req.body.query
    })
    const insertQ = await query.save();
    res.send(insertQ);
    console.log(insertQ);
})
app.post('/contact',async(req,res)=>{
    const contact = await new ContactUs({
        name:req.body.name,
        address:req.body.address,
        mobile:req.body.mobile,
        message:req.body.message,
        donation:req.body.donation,
    })
    const insertQ = await contact.save();
    res.send(insertQ);
    console.log(insertQ);
})
app.get('/contactus',async(req,res)=>{
    Contactus.find()
    .then((document)=>{
        res.send(document);
    })
})
app.get('/Query',async(req,res)=>{
    Query.find()
    .then((document)=>{
        res.send(document);
    })
})
app.listen(port,(req,res)=>{
    console.log(`connected at ${port}`);
})