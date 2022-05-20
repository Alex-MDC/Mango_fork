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


router.get('/',/*verify,*/ async function(req,res){

  //  console.log(`User id is: ${req.userId}`)
 //   var userName = req.userId
  //  res.render('home', {resultsAPI, urlArray,userName});
  res.render('index');
  
  });


  router.get("/index", async  (req,res) => {
    res.render('index');
  })

  router.get("/signup", async  (req,res) => {
    res.render('signup');
  })
  router.get("/login", async  (req,res) => {
    res.render('login');
  })
  router.get("/aprender", async  (req,res) => {
    res.render('aprender');
  })
  router.get("/aprender_tema", async  (req,res) => {
    res.render('aprender_tema');
  })
  router.get("/perfil", async  (req,res) => {
    res.render('perfil');
  })
   router.get("/practicar_pregunta", async  (req,res) => {
    res.render('practicar_pregunta');
  })
  router.get("/practicar", async  (req,res) => {
    res.render('practicar');
  })
  

  router.post('/signup', async function(req,res){
  
    //Implementar logica
    console.log(req.body)
    var user = new User(req.body)
    const usercheck = await User.findOne({email: user.email})

    if (user.password == ""){
      return res.redirect('/signup')
      }else{

        if (user.email == ""){
          return res.redirect('/signup')
          }
          else{          
            if (!usercheck){
            user.password = await bcrypt.hashSync(user.password, 10)
            await user.save()
            //home comom placholder
            res.redirect('/index')
            
          }
        }
    }

    
    });
    // signup end----------------

  module.exports = router;