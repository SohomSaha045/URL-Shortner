const shortid=require('shortid');
const url=require('../models/url')
async function generateNewShortURL(req,res){
    const body=req.body;
    if(!body.url){
        return res.status(400).json({
            error:'URL is required'
        });
    }
    const shortId=shortid(8);
    await url.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory:[]
    }
    );
    return res.json({id:shortId});
}
async function getAnalytics(req,res){
    shortId=req.params.shortId;
    const result=await url.findOne({ shortId });
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    });
}
module.exports={
        generateNewShortURL,
        getAnalytics
}