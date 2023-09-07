const { getUser } = require("../service/auth");

async function restrictToLoggedInUser(req,res,next){
    const userUid=req.cookies?.uid;
    if(!userUid){
        return res.status(404).json({
            status:"ERROr"
        })
    }
    const user=getUser(userUid)

    if(!user){
         return res.status(404).json({
        status:"ErrOR"
    })
   }
   req.user=user;
   next();
}
module.exports={
    restrictToLoggedInUser
}