const express = require('express')
const cors= require('cors')
const mongoose = require('mongoose')
// const User = require('./Model/user')
const user = require('./routes/route')

const app = express();
app.use(express.json());
app.use(cors());
app.get('/',(req,res)=>{
    res.send("hello");
})
const MONGO_URL="mongodb+srv://parvathamramcharan7:Msdhoni133@cluster0.f3nc6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(MONGO_URL)
.then( ()=> console.log("mongodb connected"))
.catch(err=> console.log(err))
app.use('/student',user);
const PORT=4000
app.listen(PORT,()=>{
        console.log(`server is running on port :${PORT}`)
})
