var mysql = require("mysql");
const express = require("express");
const app = express();
var session = require("express-session");
var cookieParser = require("cookie-parser");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mercadoliebre",
});

function getAllUsuarios() {}
function getUsuario(con, data, callback) {
  let sel_query = "SELECT * FROM usuarios WHERE email = ? AND pwd = ?;";
  let query = mysql.format(sel_query, [data.email, data.pwd]);
  let queryres = {};
  con.query(query, function (err, result) {
    if (err) throw err;
    console.log(result[0]);
    if (result[0] != undefined) {
      queryres = { nombre: result[0].nombre, email: result[0].email };
      return callback(queryres);
    } else {
      return callback(result);
    }
  });
}

function crearUsuario(con, data, callback) {
  let checkQuery = "SELECT * FROM usuarios WHERE nombre = ? OR email = ?;";
  let mycheckquery = mysql.format(checkQuery, [data.name, data.email]);
  let usado = 0;
  con.query(mycheckquery, function (err, res) {
    if (err) throw err;
    console.log(res);
    if (res[0]) {
      callback("Usado");
    }else{
    let ins_query =
      "INSERT INTO usuarios (nombre, email, pwd) VALUES (?, ?, ?);";
    let query = mysql.format(ins_query, [data.name, data.email, data.pwd]);
    con.query(query, function (err, result) {
      if (err) throw err;
      callback(result);
    });}
  });
}

module.exports = {
  get: (req, res) => {
    res.send("Usuario");
  },
  create: (req, res) => {
    data = { name: req.body.name, email: req.body.email, pwd: req.body.pwd };
    crearUsuario(con, data, (result) => {
      if (result == "Usado") {
        res.write("<h1>Usado</h1>");
        res.end();
      } else {
        //res.json(result);
        req.session.name = data.name;
        req.session.email = data.email;
        res.redirect("/");
      }
    });
  },
  login: (req, res) => {
    data = { email: req.body.email, pwd: req.body.pwd };
    getUsuario(con, data, (result) => {
      if (result.nombre == undefined) {
        res.write("<h1>No se encontro el usuario.</h1>");
        res.end();
      } else {
        req.session.name = result.nombre;
        req.session.email = result.email;
        req.session.userid = result.id;

        req.session.save(function(err) {
        res.redirect("/");})
      }
    });
  },
  logout: (req, res) => {
    if (req.session) {
      req.session.destroy((err) => {
        res.redirect("/");
      });
    } else {
      res.redirect("/iniciar-sesion");
    }
  },
};
