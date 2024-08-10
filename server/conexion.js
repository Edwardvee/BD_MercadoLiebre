var mysql = require('mysql');
const { exit } = require('process');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  multipleStatements: true

});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE IF NOT EXISTS mercadoLiebre;", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
   con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mercadoLiebre",
      multipleStatements: true

  });
  
  createTableUser = "CREATE TABLE IF NOT EXISTS usuarios(id INT  NOT NULL AUTO_INCREMENT, nombre VARCHAR(20), email VARCHAR(255), pwd VARCHAR(20), PRIMARY KEY (id));"
  con.query(createTableUser, function (err, result) {
    if (err) throw err;
    console.log("Table created");
    
  });
  createTablePubli = "CREATE TABLE IF NOT EXISTS publicaciones(id INT NOT NULL AUTO_INCREMENT, titulo VARCHAR(255), condicion VARCHAR(20), zona VARCHAR(255), descripcion VARCHAR(1000), precio int, stock int, fecha_publi datetime, fecha_baja datetime, PRIMARY KEY (id));"
  con.query(createTablePubli, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
  createTableCompras = "CREATE TABLE IF NOT EXISTS compras(id INT NOT NULL AUTO_INCREMENT, id_comprador int, id_publicacion int, PRIMARY KEY (id));"
  con.query(createTableCompras, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
  createTableUbicaciones = "CREATE TABLE IF NOT EXISTS Ubicaciones(id INT NOT NULL AUTO_INCREMENT, ciudad VARCHAR(255), PRIMARY KEY(id));";
  con.query(createTableUbicaciones, function (err, result) {
    if (err) throw err;
    console.log("Table created");
   
  });
 insertUbicacionesData = "INSERT INTO Ubicaciones(ciudad) VALUES('Buenos Aires'); INSERT INTO Ubicaciones(ciudad) VALUES('Rosario'); INSERT INTO Ubicaciones(ciudad) VALUES('Cordoba'); ";
  con.query(insertUbicacionesData, function (err, result) {
    if (err) throw err;
    console.log("Table filled!");
    
  });
  insertPublicaciones = "INSERT INTO publicaciones(titulo, condicion, zona, descripcion, precio, stock, fecha_publi, fecha_baja) VALUES('Autazo', 'Usado', 'Buenos Aires', 'Vo apreta fuerte que arranca' ,'500000', '1', NOW(), null);INSERT INTO publicaciones(titulo, condicion, zona, descripcion, precio, stock, fecha_publi, fecha_baja) VALUES('Televisores Smart', 'Nuevo', 'Cordoba', 'Televisores smart, HAY STOCK!! No preguntar','200000', '50', NOW(), null); INSERT INTO publicaciones(titulo, condicion, zona, descripcion, precio, stock, fecha_publi, fecha_baja) VALUES('Control Usado', 'Nuevo', 'Rosario','Lo vendo porque ya no lo uso. Como nuevo. Tomate el 4334 y decile que te baje en lo de chicho.', '200', '1', NOW(), null);";
  con.query(insertPublicaciones, function (err, result) {
    if (err) throw err;
    console.log("Table filled!");
    exit();
  });
});
