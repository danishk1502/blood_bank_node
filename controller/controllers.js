const pool = require('../db/database');
const bcrypt = require('bcrypt');

//user Creation controllers 

exports.registration =  (async(req,res)=>{
    const name = req.body.name;
    const lname = req.body.lname;
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    const username = req.body.username
    
    pool.query(`INSERT INTO userData (name, lname, password, username) VALUES ('${name}', '${lname}', '${password}', '${username}')`, (err, result)=>{
        if (err) throw err;
        console.log(result);
    })
})




// for data get controller
exports.dataShow = ((req,res)=>{
    const data =pool.query(`SELECT * from userData`, (err, result)=>{
        if (err) throw err;
        res.send(result);
    })
})


