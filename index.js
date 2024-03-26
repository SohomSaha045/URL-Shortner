const express = require("express");
require('dotenv').config();
const router = require("./routes/url");
const routerAuth = require("./routes/user");
const { restrictToLoggedInUser }=require('./middleware/auth')
const cors = require('cors');
const { connection } = require("./connectMongo");
const url = require("./models/url");
const app = express();
const cookieParser=require('cookie-parser');
const PORT = process.env.PORT || 8000;
connection(process.env.db_url).then(() => {
  console.log("MongoDb Connected");
});
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/auth',routerAuth);
// app.use("/url",restrictToLoggedInUser,router);
app.use("/url",router);
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await url.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}.....`);
});
