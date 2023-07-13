require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./routes/routers');

app.use(express.json());

app.use('/', router);




app.listen(process.env.APP_PORT, ()=>{
    console.log("app listen at port :"+ process.env.APP_PORT);
})