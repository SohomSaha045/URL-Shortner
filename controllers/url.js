const {nanoid}=require('nanoid');
const url=require('../models/url')
async function generateNewShortURL(req,res){
    const body=req.body;
    if(!body.url){
        return res.statu(400).json({
            error:'URL is required'
        });
    }
    const shortId=nanoid(8);
    await url.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory:[]
    }
    );
    return res.json({id:shortId});
}
module.exports={
        generateNewShortURL,
        
}