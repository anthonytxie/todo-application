// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); //destructuring

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
	if (err) {
		return console.log('Unable to connect to MongoDB server');
	}
	console.log('Connected to MongoDb Server');

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('58f654d51d457f496e531cec')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // });

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('58f67c4e17b4ff4e2687cba1')
  }, {
    $set: {
      name: "Anthony"
    },
    $inc: {
    	age: 3
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });

	// db.close();
});



