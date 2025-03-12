const express = require('express')
const mongoose = require('mongoose')
var app = express()
app.use(express.json())
mongoose.connect('mongodb://127.0.0.1:27017')
.then((res)=>{console.log('Connected successfully')})
.catch((err)=>{console.log(err)})


app.post('/users', (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
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

app.delete('/users/id:',(req,res)=>{
    User.fin(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted' });
      })
      .catch(err => {
        res.status(500).json({"message":"Deletion Failed" });
      });
  });
  

  



app.listen(5000, () => {
    console.log("Server Started")
})