const express = require('express');
const app = express();
const port = 5645;

app.use("/", (req,res)=>{
    res.send("hii this is first port")
})

app.listen(port, ()=>{
    console.log("app listen at port :"+ port);
})