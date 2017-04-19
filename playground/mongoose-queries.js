const {mongoose} = require('./../server/db/mongoose');
const {toDo} = require ('./../server/models/todo');
const {User} = require('./../server/models/user');
const {ObjectID} = require('mongodb'); //destructuring

let id = '58f6bdf87d08cc58f74882ea11';

if (!ObjectID.isValid(id)) {
  console.log('Id not valid')
};

// //returns an array
// toDo.find({_id: id}).then((docs)=> {
//   console.log(docs);
// })
// //if not found returns empy array


// //returns a single object
// toDo.findOne({_id: id}).then((doc)=> {
//   if (!doc) {
//     return console.log('ID not found');
//   }
//   console.log(doc);
// })
// //if not found returns object with id, then returns null


// //returns a single object
// toDo.findById(id).then((doc)=> {
//   if (!doc) {
//     return console.log('ID not found');
//   }
//   console.log(doc)
// }).catch((e)=> console.log(e));

User.findById('58f68ee7fe40da509a8d9166').then((doc)=> {
  if (!doc) {
    return console.log('ID not found');
  }
  console.log(JSON.stringify(doc,undefined,2))
}).catch((err)=> console.log(err));



//findone returns one document at most
//if not found returns null 