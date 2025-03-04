// const fsPromises=require('fs').promises;    
const jwt=require('jsonwebtoken');
const User=require('../model/User')
// const path=require('path');
// const bcrypt=require('bcrypt');
// const { access } = require('fs');
// const userDB={
//     users:require('../model/db.json'),
//     setUsers:function(data){
//         this.users=data;
//     }
// }
const handleLogout=async (req,res)=>{
   const cookies=req.cookies;
   console.log(cookies);
   if(!cookies?.jwt){
    return res.sendStatus(400).json({msg:"please login first"});
   }
    const refreshToken=cookies.jwt;
    const foundUser=await User.findOne({refreshToken}).exec();
    if(!foundUser){
        res.clearCookie('jwt',{httpOnly:true,sameSite:'None'});
        return res.sendStatus(404).json({msg:"user not found"});    
    }
    foundUser.refreshToken='';
    const result=await foundUser.save();
    console.log(result);
    // const otherUsers=userDB.users.filter(user=>user.name!==foundUser.name);
    // const currentUser={...foundUser,refreshToken:''};
    // userDB.setUsers([...otherUsers,currentUser]);   
    // await fsPromises.writeFile(path.join(__dirname,'../model/db.json'),JSON.stringify(userDB.users));    
    res.clearCookie('jwt',{httpOnly:true,sameSite:'None'});
    res.status(204).json({msg:"logoutSuccess"});
    
}


module.exports={handleLogout};