const express = require('express')
const cors= require('cors')
const mongoose = require('mongoose')
// const User = require('./Model/user')
const user = require('./routes/route')

const app = express();
app.use(express.json());
const corsOptions = {
     origin: ["https://user-management-system-frontend-beta.vercel.app" ], // Replace with your actual frontend domain
    methods: ["GET","HEAD","PUT","PATCH","POST","DELETE"],
    allowedHeaders: 'Content-Type, Authorization',
  };
  
  app.use(cors(corsOptions));
//   app.use(cors());
app.get('/',(req,res)=>{
    res.send("hello");
})
const MONGO_URL="mongodb+srv://parvathamramcharan7:Msdhoni133@cluster0.f3nc6.mongodb.net/usermanage?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(MONGO_URL)
.then( ()=> console.log("mongodb connected"))
.catch(err=> console.log(err))
app.use('/student',user);
const PORT=4000
app.listen(PORT,()=>{
        console.log(`server is running on port :${PORT}`)
})
