const { render } = require('ejs');
const express = require('express');
const router = express.Router();
var User = require("../Models/user")
const { default: axios } = require("axios");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const verify = require("../middleware/verify_access.js")
//
const SECRET = process.env.SECRET || "perryThePlatypus"


router.get('/',verify, async function(req,res){

  //  console.log(`User id is: ${req.userId}`)
 //   var userName = req.userId
  //  res.render('home', {resultsAPI, urlArray,userName});
  res.render('index');
  
  });


  router.get("/home", async  (req,res) => {
    res.render('home');
  })
  // register begin-------

  router.get("/register", async  (req,res) => {
    res.render('register');
  })

  router.post('/register', async function(req,res){
  
    //Implementar logica
    console.log(req.body)
    var user = new User(req.body)
    const usercheck = await User.findOne({email: user.email})

    if (user.password == ""){
      return res.redirect('/register')
      }else{

        if (user.email == ""){
          return res.redirect('/register')
          }
          else{          
            if (!usercheck){
            user.password = await bcrypt.hashSync(user.password, 10)
            await user.save()
            //home comom placholder
            res.redirect('/home')
            
          }
        }
    }

    
    });
    // register end----------------

  module.exports = router;