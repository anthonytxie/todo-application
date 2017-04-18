const express = require('express');
const bodyParser = require('body-parser');
const {mongoose} = require('./db/mongoose');
const {toDo} = require('./models/todo');
const {User} = require('./models/user');
const app = express();




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

app.listen(3002,()=> {
	console.log('Server is up and running on port 3002.')
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