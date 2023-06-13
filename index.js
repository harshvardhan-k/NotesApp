const express = require('express')
const mongoose=require('mongoose')
const Note =require('./models/Notes.js') 
const User =require('./models/User.js')
const Notes = require('./models/Notes.js')
const app = express()
const port = 3000
app.use(express.json({extended:true}));
app.use(express.urlencoded()); 

//mongoose.connect('mongodb+srv://hvk899:Harshit%40@cluster1.k4ddpzf.mongodb.net/?retryWrites=true&w=majority')
mongoose.connect('mongodb+srv://hvk899:Harshit%40mongo1@cluster1.k4ddpzf.mongodb.net/?retryWrites=true&w=majority')
.then(()=>console.log('Connected to database'))
.catch(err=>console.log(err));

app.get('/', (req, res) => {
  res.sendFile('pages/index.html',{root:__dirname})
})
app.get('/login', (req, res) => {
    res.sendFile('pages/login.html',{root:__dirname})
})
app.get('/register', (req, res) => {
    res.sendFile('pages/register.html',{root:__dirname})
})
 

app.post('/getnotes', async(req, res) => {
    let notes=await Note.find({email: req.body.email})
    res.status(200).json({success: true, notes});
})
app.post('/login', async(req, res) => {
    const {userToken}=req.body;
    let user=await User.findOne(req.body);
    if(!user){
        res.status(400).json({success:false,message:'User not found'})
    }
    else{
        res.status(200).json({success:true,user:{email:user.email},message:'User found'});
    }
})
app.post('/register', async(req, res) => {
    const {userToken}=req.body;
    console.log(req.body);
    let user=await User.create(req.body);
    res.status(200).json({success:true, user:user});
})
app.post('/addnote', async(req, res) => {
    const {userToken}=req.body;
    let note=await Note.create(req.body);
    res.status(200).json({success:true, note});
})
app.delete('/deletenote/:id', async(req, res) => {
    try {
        const blog = await Note.findOneAndDelete({_id: req.params.id})
        if(!blog){
            return  res.status(404).json({error:'Note not found'}); 
        }
        res.status(200).json({msg:'Blog deleted'});
    } catch (error) {
        res.status(400).json({error:error}); 
    }
    // const {userToken}=req.body;
    // res.sendFile('pages/register.html',{root:__dirname})   
})
 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})