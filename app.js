const mysql = require("mysql");
const express = require("express");
const sessions = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
var login = require("./routes/login");
const req = require("express/lib/request");
const res = require("express/lib/response");

const app = express();
const db = mysql.createConnection({
  host: "localhost",
  password: "root",
  database: "bcnf",
  user: "root",
});

db.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Database Connected!!");
  }
});

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
  sessions({
    secret: "secret$code321",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1200000 },
  })
);

app.set("view engine", "ejs");
app.engine("ejs", require("ejs").__express);
app.listen(5030, () => {
  console.log("Database is running on port 5030");
  console.log("Welcome Sir Wallace");
});

app.use("/login", login);

//This is where the session is called and used on the index page
app.get("/", (req, res) => {
  if (req.session.loggedIn == true) {
    let sql =
      "Select st.student_name AS StudentName, st.student_email AS Email, st.student_address AS Address FROM bcnf.students st GROUP BY student_name";
    db.query(sql, (err, results) => {
      if (err) {
        console.log("Error!!!");
      } else {
        var students = results;
        res.render("index.ejs", { students });
      }
    });
  } else {
    res.redirect("/login");
  }
});

app.get("/", (req, res) => {
  if (req.session.loggedIn == true) {
    let sql = "SELECT COUNT(name) FROM bcnf.teachers;";
    db.query(sql, (err, results) => {
      if (err) throw err;
      var teacherCount = results;
      res.render("index.js", { teacherCount });
    });
  } else {
      res.redirect('/login')
  }
});

app.get("/", (req, res) => {
    if (req.session.loggedIn == true) {
      let sql = "SELECT MAX(age) FROM bcnf.teachers";
      db.query(sql, (err, results) => {
        if (err) throw err;
        var maxAge = results;
        res.render("index.js", { maxAge });
      });
    } else {
        res.redirect('/login')
    }
  });

  app.get("/", (req, res) => {
    if (req.session.loggedIn == true) {
      let sql = "SELECT MIN(age) FROM bcnf.teachers";
      db.query(sql, (err, results) => {
        if (err) throw err;
        var minAge = results;
        res.render("index.js", { minAge });
      });
    } else {
        res.redirect('/login')
    }
  });

module.exports = db;
