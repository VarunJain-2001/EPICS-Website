const express = require("express");
const app = express();
const mongoose = require('mongoose');
const Register = require("./model/Register");
const port = process.env.PORT ||2000;
const cors = require('cors');
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
app.use(cors());
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
app.listen(port,(req,res)=>{
    console.log(`connected at ${port}`);
})