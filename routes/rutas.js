
const express = require("express")
const router = express.Router();
router.use(express.json());      
router.use(express.urlencoded()); 
const userController = require("./../controllers/userController.js");
const indexController = require("./../controllers/indexController.js");

var session = require('express-session')
var cookieParser = require('cookie-parser');
const productoController = require("../controllers/productoController.js");
router.use(cookieParser("elpepe"))
  
router.use(function(req, res, next) {
        res.locals.user = req.session
        next();
  });

router.get("/", indexController.list)
    
router.get("/tus-compras", indexController.compras)

router.get("/ss",(request, response) =>{
    response.send("<h1>" +  JSON.stringify(request.session.user) + "</h1>");
})

router.post("/iniciarUsuario", userController.login);
router.get("/iniciar-sesion",(request, response) =>{
    response.render("iniciar-sesion");
})
router.get("/producto/:id", indexController.show);
router.get("/setearZona/:zona", (req, res) =>{
    
    req.session.address = req.params.zona;
    req.session.save(function(err) {
        res.redirect("back")      })
   
});
router.get("/comprar/:id", productoController.buy);

router.get("/buscar", indexController.search);
router.get("/logout", userController.logout);

router.post("/crearUsuario", userController.create);
router.get("/registrarse",(request, response) =>{
    response.render("registrarse");
})

module.exports = router