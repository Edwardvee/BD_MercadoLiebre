const express = require("express");
const mariadb = require('mariadb');
const { readFile } = require("fs");
var session = require('express-session')
var cookieParser = require('cookie-parser');

const path = require('path');
const app = express();
app.set('trust proxy', 1) // trust first proxy
app.use(cookieParser("elpepe"));
// parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const filestore = require("session-file-store")(session) 

//serving public file

app.use(
    session({
      key: "session-ml",
      secret: "elpepe",
      resave: true,
      cookie: {
        secure: false,
        httpOnly:true,
        
      },
      store: new filestore(),
      saveUninitialized: false
    })  
  );

const Rutas = require("./routes/rutas.js");
app.use(express.json());      
app.use(express.urlencoded()); 
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "/public")));


app.use(Rutas);


app.listen(3005, ()=>{
console.log("Server corriendo en el puerto 3005")
});

