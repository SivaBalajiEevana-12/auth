const Employee=require('../model/Employee')
const createEmployee=async (req,res)=>{
    const{name,password,email}=req.body;
    if(!name || !password || !email){   
    return res.status(400).json({msg:"please include name,password,email"});
    }
    const foundUser=await Employee.findOne({email}).exec();
    if(foundUser){
      return res.status(400).json({msg:"email already exists enter new email are login"});
    }
    try{
            const result= await Employee.create({
                firstName:name,
                lastName:password,
                email
            })
            res.json(result);
    }
    catch(err)
    {
        res.status(400);
    }
}
module.exports={createEmployee};