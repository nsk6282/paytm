const express = require("express");
const rootRouter = require("./routes");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jsonwebtoken = require('jsonwebtoken');



app.use(cors());
app.use(express.json());
app.use('/api/v1',rootRouter);

app.get("/",(req,res)=>{
    res.send("home");
})
app.listen(3000,(req,res)=>{
    console.log("server running on portt 3000");
})


