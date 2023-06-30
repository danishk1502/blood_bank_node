const express = require('express');
const app = express();
const port = 5645;
const mysql =require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:"blood_bank_db"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected");
  const sql = "INSERT INTO user (Name, Email) VALUES ('Danish', 'kdanishwins')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });

});



app.use("/", (req,res)=>{
    res.send("hii this is first port")
})

app.listen(port, ()=>{
    console.log("app listen at port :"+ port);
})