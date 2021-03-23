const express = require('express');
const campaignList = require('./data/campaign-list');
const serveStatic=require('serve-static')
const cors = require('cors')
const app = express();
app.use(cors());
app.use(serveStatic('data'))
app.get('/', (req, res)=> {
    res.send('API is running');
}); 



app.get('/api/campaignData', (req, res)=> {
    // res.send('API is running');
    res.json(campaignList)
});

app.listen(process.env.PORT || 5000, console.log("server is running on port 5000"));