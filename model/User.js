const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const userSchema=new Schema(
    {
        id:{
            type:Number,
            required:true
        },
        username:{
            type:String,
            required:true
        },
        roles:{
            user:{
                type:Number,
                default:2001
            },
            Editor:Number,
            Admin:Number
        }
        ,
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        refreshToken:String
    } 
);
module.exports=mongoose.model('User',userSchema);
//Employee===>employees