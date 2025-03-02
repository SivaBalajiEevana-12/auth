const express=require('express');
// const path = require('path');
const router=express.Router();
const {handleRefreshToken}=require('../controller/refereshTokenController');
// const fsPromises=require('fs').promises;
router.post('/user',handleRefreshToken);
module.exports=router;