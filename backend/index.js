const express = require ("express");
require("dotenv").config()
const connectDB = require ("./config/db");
const seedRoute = require('./routes/seedRoute');
const apiRoutes = require('./routes/apiRoutes');


const app = express();

const port = process.env.PORT || 5000;
connectDB()
app.use('/api', seedRoute);
app.use('/api', apiRoutes);
app.get("/",(req,res)=>{
    res.send("hello form backend");
});

app.listen(port,()=>{
    console.log(`server is running on ${port}`);
});