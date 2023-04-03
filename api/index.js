const express = require("express");
const cors = require("cors");
//const https = require('https');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("./models/User.js");
const cookieParser = require('cookie-parser');

/*const fs = require('fs');
const key = fs.readFileSync('../key.pem');
const cert = fs.readFileSync('../cert.pem');*/
require("dotenv").config();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'random_string';

app.use(express.json());
app.use(cookieParser());

/*const server = https.createServer({key: key, cert: cert }, app);*/

/*
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://212.101.137.119:5175');
  //res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  //res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

  next();
});
*/

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
      jwt.sign({
        email:userDoc.email, 
        id:userDoc._id,
         name: userDoc.name}, jwtSecret, {}, (err, token)=>{
        if (err) throw err;
        res.cookie('token', token, {sameSite:'none', secure: false}).json(userDoc);
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



app.get('/profile', (req, res) =>{
  const {token} = req.cookies;
  if(token){
    jwt.verify(token, jwtSecret, {}, async (err, userData) =>{
      if(err) throw err;
      const {name, email, id} = await User.findById(userData.id);
      res.json({name, email, id});
    })
  }
  else{
    res.json(null);
  }
  
})
//F9TUCc0PNl801xrm

app.post('/logout', (req, res) =>{
  
  res.cookie('token', '').json(true);
});



app.listen(5000);
