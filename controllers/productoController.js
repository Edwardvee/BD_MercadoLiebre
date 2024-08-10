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

function comprar(con, data, callback) {
  let sql = "INSERT INTO compras(id_comprador, id_publicacion) VALUES(?, ?);";
  let querypreparada = mysql.format(sql, [data.user, data.publication]);
  con.query(querypreparada, function (err, result) {
    if (err) throw err;
    let sql2 = "UPDATE publicaciones SET stock = stock - 1 WHERE id = ?;";
    let querypreparada2 = mysql.format(sql2, [data.publication]);
    con.query(querypreparada2, function(erro, r){
      if(erro) throw erro;
    })
    callback(result)
  });
}

module.exports = {
  buy: (req, res) => {
    data = { publication: req.params.id, user: req.session.userid };
    comprar(con, data, (result) => {
      res.redirect("back");
    });
  },
};
