const express = require("express");
const cors = require("cors");
const app = express();

const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("./models/User.js");
require("dotenv").config();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'random_string';

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://212.101.137.119:5175');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

  next();
});

app.use(
  cors({
    credentials: true,
    origin: "http://212.101.137.119:5175",
  })
);


mongoose.connect(process.env.MONGO_URL)


app.get("/test", (req, res) => {
  res.json("tesk ok");
});



app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  
  try{

    const userDoc = await User.create({
    name,
    email,
    password:bcrypt.hashSync(password, bcryptSalt),
  });
  res.json(userDoc);
  }
  catch (e){
    res.status(422).json(e)
  }
  
 
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({email});

  if(userDoc){
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if(passOk){
      jwt.sign({email:userDoc.email, id:userDoc._id}, jwtSecret, {}, (err, token)=>{
        if (err) throw err;
        res.cookie('token', token, {sameSite:'none', secure: true}).json('pass ok');
      });
      
    }
    else{
      res.status(422).json('pass not ok');
    }
  }
  else{
    res.json('not found');
  }
});


//F9TUCc0PNl801xrm


app.listen(5000);
