// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); //destructuring

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
	if (err) {
		return console.log('Unable to connect to MongoDB server');
	}
	console.log('Connected to MongoDb Server');

	// deleteMany target many documents
	// db.collection('Todos').deleteMany({text: "Kill babies"}).then((result) => {
	// 	console.log(result)
	// },(err) => {	
	// 	console.log('Error connecting to ToDos', err)
	// })
	// deleteOne deletes first that matches criteria
	// db.collection('Todos').deleteOne({text: "Something to do"}).then((result) => {
	// 	console.log(result)
	// },(err) => {	
	// 	console.log('Error connecting to ToDos', err)
	// })
	// findOneAndDelete
	// db.collection('Todos').findOneAndDelete({text: "Something to do"}).then((result) => {
	// 	console.log(result)
	// },(err) => {	
	// 	console.log('Error connecting to ToDos', err)
	// })

	db.collection('Users').findOneAndDelete({_id: new ObjectID('58f66c263981534bad2d209b')}).then((result)=> {
		console.log(result);
	}, (err) => {
		console.log(err);
	});


	// db.close();
});



