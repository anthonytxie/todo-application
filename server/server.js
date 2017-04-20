
require('./config/config');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {mongoose} = require('./db/mongoose');
const {toDo} = require('./models/todo');
const {User} = require('./models/user');
const app = express();
const {ObjectID} = require('mongodb'); //destructuring
const port = process.env.PORT;
const {authenticate} = require('./middleware/authenticate');

//for resource creation
app.use(bodyParser.json());

app.get('/', (req,res) => {
  res.redirect('/todos');
})


app.post('/todos', (req,res)=> {
	let newtoDo = new toDo({
		text: req.body.text
	});
	newtoDo.save().then((doc) => {
		res.send({todo:doc})
	}, (e) => {
		res.status(400).send(e);
	})
});

app.get('/todos', (req,res)=> {
  toDo.find().then((doc) => {
    res.send({todo: doc})
  }, (err) => {
    res.status(400).send(err)
  })
});

app.get('/todos/:userid', (req,res)=> {
    let userId = req.params.userid;
    if (!ObjectID.isValid(userId)) {
         return res.status(404).send('ID not valid')
        }
    toDo.findById(req.params.userid).then((doc)=> {
      if(!doc) {
        return res.status(404).send(`Unable to find User ${userId}`)
      }
      res.send({todo: doc});
    }).catch((err) => {
      res.status(404);
    })
})

app.delete('/todos/:userid', (req,res) => {
  let userID = req.params.userid;
  if (!ObjectID.isValid(userID)) {
      return res.status(404).send('ID not valid')
  }
  toDo.findByIdAndRemove(userID).then((doc) => {
    if (!doc) {
      return res.status(404).send(`Unable to find User ${UserID}`)
    }
    res.send({todo: doc})
  }).catch((err) => {
    res.status(404).send();
  })
})

app.patch('/todos/:userid', (req,res) => {
  let userID = req.params.userid
  //.pick(req.body)... picks properties to pull off object and gets the key value pairs
  let body = _.pick(req.body, ['text','completed']); //takes an array of properties to pull off object
    if (!ObjectID.isValid(userID)) {
      return res.status(404).send('ID not valid')
  };

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  //new:true returns updated object, not original
  toDo.findByIdAndUpdate(userID, {$set: body}, {new:true}).then((doc)=> {
    if (!doc) {
      return res.status(404).send();
    }
    res.send({todo: doc})
  }).catch((e)=> {
    res.stats(400).send();
  })
  });


app.post('/user', (req,res)=> {
  let body = _.pick(req.body,['email','password']);
  let newUser = new User(body)
  newUser.save().then(()=> {
    return newUser.generateAuthToken();
  }).then((token) => {
    res.header('x-auth',token).send(newUser);
  }, (err) => {
    res.status(404).send(err)
  })
})



app.get('/users/me', authenticate, (req,res)=> {
  res.send(req.user)
});

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