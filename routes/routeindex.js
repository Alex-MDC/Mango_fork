const { render } = require('ejs');
const express = require('express');
const router = express.Router();
var User = require("../Models/user")
const { default: axios } = require("axios");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const verify = require("../middleware/verify_access.js");
const user = require('../Models/user');
//
const SECRET = process.env.SECRET || "perryThePlatypus"


router.get('/', async function(req,res){

  //  console.log(`User id is: ${req.userId}`)
 //   var userName = req.userId
  //  res.render('home', {resultsAPI, urlArray,userName});
  res.render('index');
  
  });


  router.get("/index", async  (req,res) => {
    console.log(req.body)
    res.render('index');
  })

  router.get("/signup", async  (req,res) => {
    res.render('signup');
  })
  router.get("/login", async  (req,res) => {
    console.log(req.body)
    res.render('login');
  })
  router.get("/aprender", async  (req,res) => {
    res.render('aprender');
  })
  router.get("/aprender_tema_familia", async  (req,res) => {
    res.render('aprender_tema_familia');
  })
  router.get("/aprender_tema_cuerpo", async  (req,res) => {
    res.render('aprender_tema_cuerpo');
  })
  router.get("/aprender_tema_alimentos", async  (req,res) => {
    res.render('aprender_tema_alimentos');
  })
  router.get("/aprender_tema_colores", async  (req,res) => {
    res.render('aprender_tema_colores');
  })
  //TODO
  //que el perfil pueda cargar info de usuarios de la db
  //bug: req esta vacio
  router.get("/perfil",verify, async  (req,res) => {

    console.log("Loading profile")
    console.log(req.userId)
    var search = req.userId
    var user = await User.findOne({username: search})
    var name = user.name
    var score = user.score
    var username = user.username
    var score = user.puntos
    console.log(user)
    console.log(name)
    console.log(score)
    console.log(username)

    res.render('perfil',{name,username,score});
  })
   router.get("/practicar_pregunta", async  (req,res) => {
    res.render('practicar_pregunta');
  })
  router.get("/practicar", async  (req,res) => {
    res.render('practicar');
  })
  //LOGOUT FUNC
  router.get('/logout', async function(req,res) {
    console.log("Logging user out")
    res.clearCookie("token")
    res.redirect("/")
    });

  router.post('/signup', async function(req,res){
  
    //Implementar logica
    console.log(req.body)
    var user = new User(req.body)
    const usercheck = await User.findOne({username: user.username})
    
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
            res.redirect('/login', {user})
            
          }
        }
    }

    
    });
    
    router.post('/login', async function(req,res){
    
      try{
      console.log(req.body)
      var {username,password} = req.body
      
      // Validar si el usuario existe
      const user = await User.findOne({username: username})
       if (username == "" || password == ""){
        return res.redirect('/login')
       } else{
        if (!user){
          await alert("User/Password Invalid")
          return res.redirect('/login')
        
        }
        // Si el usuario existe, vamos a generar un token de JWT
        else {
        const valid = await bcrypt.compare(password,user.password) 
      
      // Si la contraseña es correcta generamos un JWT
        if (valid) {
      
          //en expires in pones la duracion de una sesiion 
          // m = minutos h = horas
          const token = jwt.sign({id:user.username, permission: true}, SECRET, {expiresIn: "45m"})
          console.log(token)
          res.cookie("token", token, {httpOnly:true})
          console.log(`User ${user.username} has logged in`)
          res.redirect("/")
      
        }
      
        else {
          console.log("Password is invalid")
          res.redirect('/login')
        }
      
        }}
    } catch(error){
      console.log(error)
    }
    });

  module.exports = router;