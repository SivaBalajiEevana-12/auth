const express=require('express');
// const path = require('path');
const router=express.Router();
const {handleLogout}=require('../controller/logoutController');
// const fsPromises=require('fs').promises;
router.post('/user',handleLogout);
module.exports=router;