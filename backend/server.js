const express = require('express')
const cors= require('cors')
require('dotenv').config();
const mongoose = require('mongoose')
// const User = require('./Model/user')
const user = require('./routes/route')

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'https://user-management-system-front.vercel.app'  // Allow only this origin
}));
  
  app.use(cors(corsOptions));
//   app.use(cors());
app.get('/',(req,res)=>{
    res.send("hello");
})
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL)
.then( ()=> console.log("mongodb connected"))
.catch(err=> console.log(err))
app.use('/student',user);
const PORT=4000
app.listen(PORT,()=>{
        console.log(`server is running on port :${PORT}`)
})
