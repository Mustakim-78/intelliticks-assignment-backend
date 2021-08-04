const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const dbSchema = require('./dbschema.js');
const cors = require('cors');
const app = express();


const port = process.env.PORT || 9000;

app.use(bodyParser.json({limit:"30mb"}));
app.use(bodyParser.urlencoded({ extended: true })); 
//app.use(fileUpload());
app.use(cors());
require('dotenv').config();

const CONN = process.env.DBCONN;
mongoose.connect(CONN,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}, () => console.log('connected'));


app.get('/', (req,res) => {
    res.send("get request")
})

app.get('/properties', async (req, res) => {
    try {
        const data  = await dbSchema.find();
        res.status(200).json(data);   
    } catch (error) {
        res.status(500).json({message:error.message});    
    }
});

app.post('/properties', async (req, res) => {
    const data = req.body;
    console.log(data);
    dbSchema.create(data, (err, data) =>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(201).send(data);
        }
    })
    // const newProperty = new dbSchema.create(data);
    // try {
    //     await newProperty.save();
    //     res.status(200).json(newProperty);
    // } catch (error) {
    //     res.status(500).json({message:error.message});
    // }

})

app.delete('/properties/:id', async (req,res) =>{
    const {id:_id} = req.params; 
   
    await dbSchema.findByIdAndRemove(_id);
    res.send("deleted");
})


app.listen(port,() => console.log("server running"));