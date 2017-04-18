// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); //destructuring


// let obj = new ObjectID();
// console.log(obj) // object id that is unique



// destructuring

// let user = {name:"Anthony", age:23}

// let {name, age} = user;
// console.log(age);

// no need to create database... can just access whatever and automatically connects.
//Mongo doesn't create database until we add data
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
	if (err) {
		return console.log('Unable to connect to MongoDB server');
	}
	console.log('Connected to MongoDb Server');

	// db.collection('Todos').insertOne({
	//     text: 'Something to do',
	//     completed: false
	//   }, (err, result) => {
	//     if (err) {
	//       return console.log('Unable to insert todo', err);
	//     }
	  
	//     console.log(JSON.stringify(result.ops, undefined, 2));
	//   });

	db.collection('Users').insertOne({name:'Isabelle',age:20}).then((result)=> {
		console.log(result)
	}, (err)=> {
		console.log(err)
	})

	db.close();
});



// in mongodb id --- timestamp, machine, processid, and  counter, 