const User = require('../models/users');
const {v4: uuidv4}=require('uuid');
const { setUser } = require('../service/auth');
async function handelUserSignup (req,res){
    const { name,email,password }=req.body;
    const uid=await User.create({
       name:name,
        email:email,
        password:password,
    });
    return res.status(400).json({
        uid: uid,
    });
    
}
async function handelUserLogin (req,res){
    const { email,password }=req.body;
    const uid=await User.findOne({
        email:email,
        password:password,
    });
    if(!uid){
        return res.status(404).json({
            status:"Invalid data"
        })
    }
    const sessionId=uuidv4();
    setUser(sessionId,uid);
    res.cookie('uid',sessionId)
    return res.status(400).json({
        uid: sessionId,
    });
    
}
module.exports={
    handelUserSignup,
    handelUserLogin
}