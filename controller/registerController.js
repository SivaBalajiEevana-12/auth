// const fsPromises=require('fs').promises;  
const User=require('../model/User');
const bcrypt=require('bcrypt');  
// // const path=require('path');
// const userDB={
//     users:require('../model/db.json'),
//     setUsers:function(data){
//         this.users=data;
//     }
// }
const handleRegister=async (req,res)=>{
    const {name,password,email}=req.body;
    if(!name || !password || !email){
        return res.status(400).json({msg:"please include name,password,email"});
    }
    const duplicate= await User.findOne({"username":name}).exec();
    if(duplicate){
        return res.status(400).json({msg:"please enter valid email or name"});
    }
    try{
        const hashPass=await bcrypt.hash(password,10);
    const id=1;
    const result=await User.create({
        "id":id,
        "username":name,
        "email":email,
        "password":hashPass,
        roles:{"admin":5450}
    });
    // userDB.setUsers([...userDB.users,user]);    
    // await fsPromises.writeFile(path.join(__dirname,'../model/db.json'),JSON.stringify(userDB.users,null,2));
    // // .then(()=>res.status(201).json(user))   
    // // .catch(err=>res.status(500).json({msg:err.message}));
    res.status(201).json(result);
    console.log(result);
    }
    catch(err){
        res.status(500).json({msg:err.message});
    }
};
module.exports={handleRegister};