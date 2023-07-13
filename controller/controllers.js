const pool = require('../db/database');
const bcrypt = require('bcrypt');

//user Creation controllers 

exports.registration = (async (req, res) => {
    const name = req.body.name;
    const lname = req.body.lname;
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    const username = req.body.username

    const allData = pool.query(`SELECT * FROM users WHERE username="${username}"`, (err, result) => {
        if (err) throw err;
        if (result.length == 0) {
            pool.query(`INSERT INTO users (name, lname, password, username) VALUES ('${name}', '${lname}', '${password}', '${username}')`, (err) => {
                if (err) throw err;
            })
            res.send("you are registered")
        }
        else {
            res.send("user exists");
        }
    })
})




// log in check
exports.login = ((req, res) => {
    pool.query(`SELECT * FROM users WHERE username="${req.body.username}"`, (err, result) => {
        if (err) throw err;
        if (result.length == 0) {
            res.send("user not exist")
        }
        else {
            for (let i = 0; i < result.length; i++) {
                bcrypt.compare(req.body.password, result[i].password, (err, bcryptResult) => {
                    if (err) throw err;
                    if (!bcryptResult) {
                        res.send("wrong password")
                    }
                    else {
                        res.send("you are logged in...");
                    }
                })
            }


        }
    })
})








// for data get controller
exports.dataShow = ((req, res) => {
    const data = pool.query(`SELECT * from users`, (err, result) => {
        if (err) throw err;
        res.send(result);
    })
})


