const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
var app = express()
app.use(express.json())
mongoose.connect('mongodb://127.0.0.1:27017/users')
.then((res)=>{console.log('Connected successfully')})
.catch((err)=>{console.log(err)})


const userschema = new mongoose.Schema({
  name:{
      type:String,
      required:true
    },
    age:{
      type:Number,
      required:true
    }
});

const User = mongoose.model('User',userschema);

app.post('/users', (req, res) => {
    const user = new User({
      
      name: req.body.name,
      age: req.body.age
    });
  
    user.save()
      .then(savedUser => {
        res.status(201).json({"message":"User created"});
      })
      .catch(err => {
        res.status(500).json({"message":"User not created"});
      });
  });
  app.delete('/users/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted' });
      })
      .catch(err => {
        res.status(500).json({ message: err.message });
      });
  });
  
  app.get('/users/:id', (req, res) => {
    User.findById(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
      })
      .catch(err => {
        res.status(500).json({ message: err.message });
      });
  });
  
  app.put('/users/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(user => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
      })
      .catch(err => {
        res.status(500).json({ message: err.message });
      });
  });


app.listen(5500, () => {
    console.log("Server Started")
})   
