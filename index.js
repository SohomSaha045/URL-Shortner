const express=require('express');
const router=require('./routes/url');
const {connection}=require('./connectMongo');
const url=require('./models/url');
const app=express();
const PORT=8001;
connection('mongodb://127.0.0.1:27017/urlShortner').then(()=>{console.log('MongoDb Connected')});
app.use(express.json());
app.use("/url",router);
app.get("/:shortId",async (req,res)=>{
    const shortId=req.params.shortId;
    const entry=await url.findOneAndUpdate(
    {shortId},{
        $push:{
            visitHistory:{
                timestamp:Date.now()
            }
        }
    }
    )
    res.redirect(entry.redirectURL);

});
 
 app.listen(PORT,()=>{
    console.log( `Listening to port ${PORT}.....`);
});
 