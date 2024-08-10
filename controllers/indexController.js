var mysql = require("mysql");
const express = require("express");
const app = express();
var session = require("express-session");
var cookieParser = require("cookie-parser");
const { search } = require("../routes/rutas");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mercadoliebre",
});

function getProductos(con, callback){
    let sel_query = "SELECT * FROM publicaciones;";
    con.query(sel_query, function (err, result) {
      if (err) throw err;
        return callback(result);
    });
}
function getOneProductos(con, id,callback){
    let sel_query = "SELECT * FROM publicaciones where id = ?;";
    let prepared_query =  mysql.format(sel_query, [id])
    con.query(prepared_query, function (err, result) {
      if (err) throw err;
        return callback(result);
    });
}
function BuscarProductos(con, id,callback){
    console.log(id)
    let sel_query = "SELECT * FROM publicaciones where titulo LIKE ?;";
    let prepared_query =  mysql.format(sel_query, [ "%" + id + "%"])
    con.query(prepared_query, function (err, result) {
      if (err) throw err;
      console.log(result)
        return callback(result);
    });
}
function BuscarCompras(con, id,callback){
    console.log(id)
    let sel_query = "SELECT * FROM compras where titulo LIKE ?;";
    let prepared_query =  mysql.format(sel_query, [ "%" + id + "%"])
    con.query(prepared_query, function (err, result) {
      if (err) throw err;
      console.log(result)
        return callback(result);
    });
}
module.exports = {
    list: (req,res) => {
    getProductos(con, (result) => {
        res.render("index", {productos: result});
    })
    },
    show: (req, res) =>{
        id = req.params.id
        getOneProductos(con, id,(result) => {
            res.render("pagProducto", {productos: result});
        })
    },
    search: (req,res) =>{
        id = req.query.texto   
        BuscarProductos(con, id,(result) => {
            res.render("resultados", {productos: result});
        })
    },
    compras: (req, res) => {
        id = req.session.userid
        BuscarCompras(con, id,(result) => {
            res.render("tus-compras", {productos: result});
        })
    }
}