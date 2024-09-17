const mongoose= require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    age:{
        type:Number,
        required:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    }
})

const user = mongoose.model('user',userSchema);
module.exports=user