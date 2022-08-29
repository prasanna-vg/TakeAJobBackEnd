var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');
var mongoose = require('mongoose');
require('dotenv').config();

var app = express();

var port = process.env.PORT || 3000;

// mongoose.connect('mongodb://localhost:27017/takeajob');
// mongoose.connection.on('connected',()=>{
//     console.log('Connected to local DB');
// })
// mongoose.connection.on('error',(err)=>{
//     console.log('Error in local DB connection');
// })
const dbUrl = process.env.MONGODBURL;
const ConnectionParams = {
    useNewUrlParser: true, useUnifiedTopology: true
}
//Connect to mongoDB
mongoose.connect(dbUrl,ConnectionParams).then(()=>{
    console.log("connected to Online DB");
}).catch((err)=>{
    console.log(err);
});
mongoose.connection.on('error',(err)=>{
    if(err){
        console.log("Error in online DB"+err);
    }
});

app.use(cors());
app.use(bodyParser.json());
const route = require('./routes/route');
app.use('/api',route);
app.get('/',(req,res)=>{
    res.send('vanako');
});
app.listen(port,()=>{
    console.log("Server started at PORT: "+ port);
});