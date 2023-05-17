const express = require("express");
const app = express();
const mongoose = require('mongoose');
const Register = require("./model/Register");
const nodeMailer = require('nodemailer');
const Query = require('./model/Query');
const ContactUs = require('./model/Contactus');
const port = process.env.PORT ||2000;
const cors = require('cors');
const Contactus = require("./model/Contactus");
const session = require('express-session')
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
app.post("/register",async(req,res)=>{
    const email=req.body.email;
    var otpc = await Math.floor(Math.random()*10000+1);
    console.log(otpc);
    const register =  await new Register({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        otp:otpc,
    });
    const insertR = await register.save();
    res.send(insertR);
        
    console.log(insertR);
    
    
    
    //opS.save();
    var transport = await nodeMailer.createTransport({
        service: 'gmail',
        auth:{
            user:'aaayush879@gmail.com',
            pass:'xyfxwqweouylprdh'
        }
    });
    var mailOption={
        from:'aaayush879@gmail.com',
        to:`${email}`,
        subject:'otp verification from A AAYUSH',
        text:`${otpc}`

    }
    transport.sendMail(mailOption, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log(info);
    });
    
    
    
})   
app.post('/optverification',async(req,res)=>{
    const otpp=req.body.otp;
    const user = await Register.findOne({otp:otpp});
    if(Date.now() - timestamp <= 5 * 60 * 1000){
        if(!user){
            res.send('cant verify');
        }
        else if(user){
            res.send('user verfied');
        }
    }
    
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
    var email=req.body.email;
    var name=req.body.name;
    const contact = await new ContactUs({
        name:name,
        address:req.body.address,
        mobile:req.body.mobile,
        email:email,
        message:req.body.message,
        donation:req.body.donation,
    })
    var transport = await nodeMailer.createTransport({
        service: 'gmail',
        auth:{
            user:'aaayush879@gmail.com',
            pass:'xyfxwqweouylprdh'
        }
    });
    var mailOption={
        from:'aaayush879@gmail.com',
        to:`${email}`,
        subject:'Query RECORDED SUCESSFULLY',
        text:`
        Thanks ${name} ! 

        We appreciate you for using our services. We have recorded your query
        and will get back to you very soon.

        Regards
        Team Vardaan
        `,
    }
    transport.sendMail(mailOption, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log(info);
    });
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