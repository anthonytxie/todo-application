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

	db.collection('Todos').insertOne({
	    text: 'Something to do',
	    completed: false
	  }, (err, result) => {
	    if (err) {
	      return console.log('Unable to insert todo', err);
	    }
	  
	    console.log(JSON.stringify(result.ops, undefined, 2));
	  });

	// db.collection('Users').insertOne({
	// 	// _id: 123, //overriding userid 
	// 	name: 'Anthony',
	// 	age: 23,
	// 	location: "Toronto"
	// }, (err,result) => {
	// 	if (err) {
	// 		return console.log('Unable to insert to Users', err)
	// 	}
	// 	console.log(result.ops[0]._id.getTimestamp()); //result.ops all documents that were inserted
	// });

	// //_id.getTimestamp() will give timestamp


	db.close();
});

; //2 arguments 1st is url where database exists, second is callback function 


// in mongodb id --- timestamp, machine, processid, and  counter, 