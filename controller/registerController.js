const fsPromises=require('fs').promises;  
const bcrypt=require('bcrypt');  
const path=require('path');
const userDB={
    users:require('../model/db.json'),
    setUsers:function(data){
        this.users=data;
    }
}
const handleRegister=async (req,res)=>{
    const {name,password,email}=req.body;
    if(!name || !password || !email){
        return res.status(400).json({msg:"please include name,password,email"});
    }
    if(userDB.users.some(user=>user.email===email || user.name===name)){
        return res.status(400).json({msg:"please enter valid email or name"});
    }
    try{
        const hashPass=await bcrypt.hash(password,10);
    const id=userDB.users.length?userDB.users[userDB.users.length-1].id+1:1;
    const user={id,name,email,password:hashPass,roles:{"user":2001}};
    userDB.setUsers([...userDB.users,user]);    
    await fsPromises.writeFile(path.join(__dirname,'../model/db.json'),JSON.stringify(userDB.users,null,2));
    // .then(()=>res.status(201).json(user))   
    // .catch(err=>res.status(500).json({msg:err.message}));
    res.status(201).json(user);
    console.log(userDB.users);
    }
    catch(err){
        res.status(500).json({msg:err.message});
    }
};
module.exports={handleRegister};