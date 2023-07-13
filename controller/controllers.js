const pool = require('../db/database');
const bcrypt = require('bcrypt');

//user Creation controllers 

exports.registration = (async (req, res) => {
    const name = req.body.name;
    const lname = req.body.lname;
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    const username = req.body.username;
    const email = req.body.email;
    const role = req.body.role;
    const state = req.body.state;
    const distt = req.body.distt;
    const is_deleted = false;
    const created_by = req.body.username;
    const updated_by = req.body.username;;
    let user_status = null;
    if (role === "user") {
        user_status = 'Active'
        const allData = pool.query(`SELECT * FROM users WHERE username="${username}" || email="${email}"`, (err, result) => {
            if (err) throw err;
            if (result.length == 0) {
                pool.query(`INSERT INTO users (name, lname, password, username, email, state, distt, user_status, is_deleted, role, created_by, updated_by ) VALUES('${name}', '${lname}', '${password}', '${username}','${email}', '${state}', '${distt}', '${user_status}','${is_deleted}', '${role}', '${created_by}', '${updated_by}')`, (err) => {
                    if (err) throw err;
                })
                res.send("you are registered")
            }
            else {
                res.send("user exists on this email or username");
            }
        })
    }
    else if (role == "blood_bank") {
        user_status = 'Deactivate'
        const allData = pool.query(`SELECT * FROM users WHERE username="${username}"`, (err, result) => {
            if (err) throw err;
            if (result.length == 0) {
                pool.query(`INSERT INTO users (name, lname, password, username, email, state, distt, user_status, is_deleted, role, created_by, updated_by ) VALUES('${name}', '${lname}', '${password}', '${username}','${email}', '${state}', '${distt}', '${user_status}','${is_deleted}', '${role}', '${created_by}', '${updated_by}')`, (err) => {
                    if (err) throw err;
                })
                res.send("you are registered")
            }
            else {
                res.send("user exists");
            }
        })
    }
    else if (role == "superuser") {
        user_status = 'Activate'
        const allData = pool.query(`SELECT * FROM users WHERE username="${username}"`, (err, result) => {
            if (err) throw err;
            if (result.length == 0) {
                pool.query(`INSERT INTO users (name, lname, password, username, email, state, distt, user_status, is_deleted, role, created_by, updated_by ) VALUES('${name}', '${lname}', '${password}', '${username}','${email}', '${state}', '${distt}', '${user_status}','${is_deleted}', '${role}', '${created_by}', '${updated_by}')`, (err) => {
                    if (err) throw err;
                })
                res.send("you are registered")
            }
            else {
                res.send("user exists");
            }
        })
    }
    else {
        res.send("Enter a valid role");
    }
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
                if (result[i].user_status == "deactivate") {
                    res.send("Sorry Your request is under progress")
                }
                else {
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


