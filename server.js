// include library
const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs"); //set view engine
app.set("views", "views"); //views ada di folder views

const db = mysql.createConnection({
  host: "localhost",
  database: "db_phpmvc",
  user: "root",
  password: "",
});

db.connect((err) => {
  if (err) throw err;

  app.get("/", (req, res) => {
    const sql = "SELECT * FROM mahasiswa";
    db.query(sql, (err, result) => {
      const users = JSON.parse(JSON.stringify(result));
      res.render("index", { users: users, title: "DATA MAHASISWA" });
    });
  });

  app.post("/tambah", (req, res) => {
    const insertSql = `INSERT INTO mahasiswa (npm, nama, prodi) VALUES ("${req.body.npm}", "${req.body.nama}", "${req.body.prodi}")`;
    db.query(insertSql, (err, result) => {
      if (err) throw err;
      res.redirect("/");
    });
  });
});

app.listen(8000, () => {
  console.log("server ready");
});
