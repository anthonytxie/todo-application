const express = require('express');
const bodyParser = require('body-parser');
const {mongoose} = require('./db/mongoose');
const {toDo} = require('./models/todo');
const {User} = require('./models/user');
const app = express();
const {ObjectID} = require('mongodb'); //destructuring
const port = process.env.PORT || 3002;


//for resource creation
app.use(bodyParser.json());

app.post('/todos', (req,res)=> {
	let newtoDo = new toDo({
		text: req.body.text
	});
	newtoDo.save().then((doc) => {
		res.send(doc)
	}, (e) => {
		res.status(400).send(e);
	})
});

app.get('/todos', (req,res)=> {
  toDo.find().then((todos) => {
    res.send({todos})
  }, (err) => {
    res.status(400).send(err)
  })
});

app.get('/todos/:userid', (req,res)=> {
    let userId = req.params.userid;
    if (!ObjectID.isValid(userId)) {
         return res.status(404).send('Id not valid')
        }
    toDo.findById(req.params.userid).then((doc)=> {
      if(!doc) {
        return res.status(404).send(`Unable to find User ${userId}`)
      }
      res.send(doc);
    }).catch((err) => {
      res.status(404);
    })
})



app.listen(port,()=> {
	console.log(`Server is up and running at port ${port}.`)
})


module.exports = {app};





// let newUser = new User({
// 	email: 'anthonytxie@gmail.com'
// });

// newUser.save().then((doc)=> {
// 	console.log(doc);
// }, (err) => {
// 	console.log('Unable to save new user', err);
// })



// // // creating a new instance of toDo 
// // let newTodo = new toDo({
// // 	text: 'Clean the house',
// // });

// // // this actually saves the newtoDo to the MongoDB database
// // newTodo.save().then((doc)=> {
// // 	console.log('Saved todo', doc);
// // }, (err) => {
// // 	console.log('Unable to save todo');
// // });