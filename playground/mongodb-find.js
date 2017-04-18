// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); //destructuring

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
	if (err) {
		return console.log('Unable to connect to MongoDB server');
	}
	console.log('Connected to MongoDb Server');
	//query our data to find all the documents pass key-value pair we're looking for in .find()
	
	db.collection('Todos').find().count().then((counts) => {
		console.log(`Todos counts: ${counts}`);
	}, (err) => {
		console.log('Unable to fetch todos', err);
	});

	db.collection('Users').find({name:'Isabelle'}).toArray().then((docs)=> {
		console.log(JSON.stringify(docs,undefined,2))
	}, (err)=> {
		console.log('Error connecting to Users', err)
	});


	// db.collection('Todos').find({
	// 	_id: new ObjectID('58f654d51d457f496e531cec') // in order to find id we need to create an objectid first
	// }).toArray().then((docs) => {
	// 	console.log('Todos');
	// 	console.log(docs);
	// }, (err) => {
	// 	console.log('Unable to fetch todos', err);
	// });

	// db.close();
});

; //2 arguments 1st is url where database exists, second is callback function 


